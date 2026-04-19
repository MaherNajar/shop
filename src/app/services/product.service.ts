import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/models/product';
import { AuthService } from './auth.service';
import { switchMap, take, catchError, tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient,
  ) {}

  get(id: string) {
    return this.db.doc<Product>('products/' + id).valueChanges();
  }

  create(product: Product): Observable<any> {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user: User) => {
        const uid = user.uid;
        return this.db
          .collection('products')
          .add({ ...product, uid })
          .pipe(
            catchError((error) => {
              console.error('Erreur lors de la création du produit:', error);
              return throwError(() => error);
            }),
          );
      }),
    );
  }

  update(product: Product): Observable<void> {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user: User) => {
        const uid = user.uid;
        return this.db
          .doc(`products/${product.id}`)
          .update({ ...product, uid })
          .pipe(
            catchError((error) => {
              console.error('Erreur lors de la mise à jour du produit:', error);
              return throwError(() => error);
            }),
          );
      }),
    );
  }

  // new API .NET CORE
  createProduct(product: Product): Observable<any> {
    return this.http.post('https://localhost:44314/api/products', product).pipe(
      tap((res) => console.log('Produit créé avec succès:', res)),
      catchError((error) => {
        console.error('Erreur lors de la création du produit via API:', error);
        return throwError(() => error);
      }),
    );
  }

  getAll() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.orderBy('dateCreation', 'desc'),
      )
      .valueChanges({ idField: 'id' });
  }

  getAvailableProducts() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.where('status', '==', 'disponible').orderBy('dateCreation', 'desc'),
      )
      .valueChanges({ idField: 'id' });
  }

  getSoldProducts() {
    return this.db
      .collection<Product>('products', (ref) =>
        ref.where('status', '==', 'vendu').orderBy('dateCreation', 'desc'),
      )
      .valueChanges({ idField: 'id' });
  }

  getMyProducts() {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) =>
        this.db
          .collection('products', (ref) =>
            ref.where('uid', '==', user.uid).orderBy('dateCreation', 'desc'),
          )
          .valueChanges({ idField: 'id' }),
      ),
    );
  }

  getArchivedProducts() {
    return this.db
      .collection<Product>('archives', (ref) =>
        ref.orderBy('dateCreation', 'desc'),
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
