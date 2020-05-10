import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  create(product: Product) {
    return this.db.collection('products').add({ ...product });
  }

  update(product: Product) {
    return this.db.doc('products/' + product.id).update({ ...product });
  }

  delete(id: string) {
    return this.db.doc('products/' + id).delete();
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
}
