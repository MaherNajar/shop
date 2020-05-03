import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  cart$: Observable<ShoppingCart>;

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    this.cart$ = this.db
      .collection('shopping-carts/' + cartId + '/items')
      .valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x)));
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.doc(`shopping-carts/${cartId}`).delete();
  }

  private create() {
    return this.db.collection('shopping-carts/').add({
      dateCreation: new Date(Date.now()).toLocaleDateString(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.doc(`shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let docRef = this.getItem(cartId, product.id);
    docRef
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: ShoppingCartItem) => {
        if (item) docRef.update({ quantity: item.quantity + change });
        else docRef.set({ ...product, quantity: 1 });
      });
  }
}
