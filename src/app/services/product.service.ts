import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: Product) {
    return this.db.collection('products').add({ ...product });
  }

  update(product: Product) {
    return this.db.doc('products/' + product.id).update({ ...product });
  }

  delete(id: string) {
    return this.db.doc('products/' + id).delete();
  }

  getAll() {
    return this.db.collection('products').valueChanges({ idField: 'id' });
  }

  get(id: string) {
    return this.db.doc('products/' + id).valueChanges();
  }
}
