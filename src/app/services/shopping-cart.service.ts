import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take, map, catchError } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
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
    private locService: LocationService,
  ) {}

  cart: ShoppingCart;

  async getCart(): Promise<void> {
    try {
      const cartId = await this.getOrCreateCartId();
      const items = await firstValueFrom(
        this.getItems(cartId).pipe(
          catchError((error) => {
            console.error('Erreur lors de la récupération du panier:', error);
            return throwError(() => error);
          }),
        ),
      );
      this.cart = new ShoppingCart(items);
    } catch (error) {
      console.error('Erreur dans getCart:', error);
    }
  }

  getItems(cartId: string) {
    return this.db
      .collection('shopping-carts/' + cartId + '/items')
      .valueChanges();
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart(): Promise<void> {
    try {
      const cartId = await this.getOrCreateCartId();
      const items = await firstValueFrom(
        this.db
          .collection<ShoppingCartItem>(`shopping-carts/${cartId}/items`)
          .valueChanges()
          .pipe(
            take(1),
            catchError((error) => {
              console.error(
                'Erreur lors de la récupération des articles du panier:',
                error,
              );
              return throwError(() => error);
            }),
          ),
      );
      await Promise.all(
        items.map((item) => this.getItem(cartId, item.id).delete()),
      );
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
    }
  }

  private async create() {
    const location = await firstValueFrom(this.locService.location$);
    return this.db.collection('shopping-carts/').add({
      dateCreation: Date.now(),
      ...location,
    });
  }

  private getItem(cartId: string, itemId: string) {
    return this.db.doc(`shopping-carts/${cartId}/items/${itemId}`);
  }

  async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async updateItem(product: Product, change: number): Promise<void> {
    try {
      const cartId = await this.getOrCreateCartId();
      const docRef = this.getItem(cartId, product.id);
      const item = await firstValueFrom(
        docRef.valueChanges().pipe(
          take(1),
          catchError((error) => {
            console.error(
              "Erreur lors de la récupération de l'article:",
              error,
            );
            return throwError(() => error);
          }),
        ),
      );

      if (item) {
        await docRef.update({
          quantity: (item as ShoppingCartItem).quantity + change,
        });
      } else {
        const location = await firstValueFrom(this.locService.location$);
        const price = location.isInTN ? product.price : product.foreignPrice;
        const { id, title, gallery } = product;
        await docRef.set({
          id,
          price,
          title,
          mainPicture: gallery.length > 0 ? gallery[0] : '',
          quantity: 1,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du panier:', error);
    }
  }
}
