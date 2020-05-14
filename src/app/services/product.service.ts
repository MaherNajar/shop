import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  async create(product: Product) {
    const uid = (await this.authService.user$.toPromise()).uid;
    return this.db.collection('products').add({ ...product, uid });
  }

  update(product: Product) {
    return this.db.doc('products/' + product.id).update({ ...product });
  }

  async delete(product: Product) {
    await this.deleteImages(product);
    return this.db.doc('products/' + product.id).delete();
  }

  getAllProducts() {
    return this.db
      .collection('products', (ref) => ref.orderBy('category'))
      .valueChanges({ idField: 'id' });
  }

  getMyProducts() {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.db
          .collection('products', (ref) =>
            ref.where('uid', '==', user.uid).orderBy('category')
          )
          .valueChanges({ idField: 'id' })
      )
    );
  }

  get(id: string) {
    return this.db.doc('products/' + id).valueChanges();
  }

  async deleteImages(product: Product) {
    for (let i = 0; i < product.images.length; i++) {
      const file = product.images[i];
      const fileRef1 = this.storage.ref(
        `produits/${product.imageRefDate}-${i}_200x200`
      );
      const fileRef2 = this.storage.ref(
        `produits/${product.imageRefDate}-${i}_400x400`
      );
      const fileRef3 = this.storage.ref(
        `produits/${product.imageRefDate}-${i}_680x680`
      );
      fileRef1.delete();
      fileRef2.delete();
      fileRef3.delete();
    }
  }
}
