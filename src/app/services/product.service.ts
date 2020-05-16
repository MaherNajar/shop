import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { AuthService } from './auth.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  get(id: string) {
    return this.db
      .doc('products/' + id)
      .valueChanges()
      .pipe(
        take(1),
        map(
          (product: Product) => (this.product = new Product({ ...product, id }))
        )
      )
      .subscribe();
  }

  create(product: Product) {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user: User) => {
          const uid = user.uid;
          return this.db.collection('products').add({ ...product, uid });
        })
      )
      .subscribe();
  }

  update(product: Product) {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user: User) => {
          const uid = user.uid;
          return this.db
            .doc(`products/${product.id}`)
            .update({ ...product, uid });
        })
      )
      .subscribe();
  }

  getAllProducts() {
    return this.db.collection('products').valueChanges({ idField: 'id' });
  }

  getMyProducts() {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.db
          .collection('products', (ref) => ref.where('uid', '==', user.uid))
          .valueChanges({ idField: 'id' })
      )
    );
  }

  async delete(product: Product) {
    await this.deleteImages(product);
    return this.db.doc('products/' + product.id).delete();
  }

  async deleteImages(product: Product) {
    const sizes = ['100x100', '400x300'];
    for (let i = 0; i < product.gallery.length; i++) {
      this.storage.ref(`produits/${product.uploadRefDate}-${i}`).delete();
      for (let j = 0; j < sizes.length; j++) {
        let s = sizes[j];
        this.storage
          .ref(`produits/${product.uploadRefDate}-${i}_${s}`)
          .delete();
      }
    }
  }
}
