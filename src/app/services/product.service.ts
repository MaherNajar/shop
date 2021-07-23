import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { AuthService } from './auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  get(id: string) {
    return this.db.doc<Product>('products/' + id).valueChanges();
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

  // new API .NET CORE
  createProduct(product) {
    return this.http
      .post('https://localhost:44314/api/products', product)
      .pipe(map((res) => console.log(res)))
      .subscribe();
  }

  getAll() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.orderBy('dateCreation', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  getAvailableProducts() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.where('status', '==', 'disponible').orderBy('dateCreation', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  getSoldProducts() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.where('status', '==', 'vendu').orderBy('dateCreation', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  getMyProducts() {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.db
          .collection('products', (ref) =>
            ref.where('uid', '==', user.uid).orderBy('dateCreation', 'desc')
          )
          .valueChanges({ idField: 'id' })
      )
    );
  }

  getArchivedProducts() {
    return this.db
      .collection<Product>('archives', (ref) =>
        ref.orderBy('dateCreation', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  async delete(product: Product) {
    await this.deleteImages(product);
    await this.db.doc('products/' + product.id).delete();
  }

  async archive(product: Product) {
    await this.db.doc('archives/' + product.id).set({ ...product });
    await this.db.doc('products/' + product.id).delete();
  }

  async restore(product: Product) {
    await this.db.doc('products/' + product.id).set({ ...product });
    await this.db.doc('archives/' + product.id).delete();
  }

  async deleteImages(product: Product) {
    const sizes = ['100x100', '400x300'];
    for (let i = 0; i < product.gallery.length; i++) {
      this.storage.ref(`colliers/${product.uploadRefDate}-${i}`).delete();
      for (let j = 0; j < sizes.length; j++) {
        let s = sizes[j];
        this.storage
          .ref(`colliers/${product.uploadRefDate}-${i}_${s}`)
          .delete();
      }
    }
  }
}
