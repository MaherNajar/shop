import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(
    private db: AngularFirestore,
    private locService: LocationService
  ) {}

  cart: ShoppingCart;

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    this.db
      .collection('shopping-carts/' + cartId + '/items')
      .valueChanges()
      .pipe(map((x: any) => (this.cart = new ShoppingCart(x))))
      .subscribe();
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db
      .collection<ShoppingCartItem>(`shopping-carts/${cartId}/items`)
      .valueChanges()
      .pipe(
        take(1),
        map((items) =>
          items.map((item) => this.getItem(cartId, item.id).delete())
        )
      )
      .subscribe();
  }

  private async create() {
    let location = await this.locService.location$.toPromise();
    return this.db.collection('shopping-carts/').add({
      dateCreation: Date.now(),
      ...location,
    });
  }

  private getItem(cartId: string, itemId: string) {
    return this.db.doc(`shopping-carts/${cartId}/items/${itemId}`);
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
      .pipe(
        take(1),
        map((item: ShoppingCartItem) => {
          if (item) docRef.update({ quantity: item.quantity + change });
          else {
            const { id, Price: price, title, gallery } = product;
            docRef.set({
              id,
              price,
              title,
              mainPicture: gallery[0],
              quantity: 1,
            });
          }
        })
      )
      .subscribe();
  }
}
