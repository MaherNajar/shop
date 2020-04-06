import { Observable } from "rxjs";
import { Product } from "../models/product";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { take, map } from "rxjs/operators";
import { ShoppingCart } from "../models/shopping-cart";
import { ShoppingCartItem } from "../models/shopping-cart-item";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  getCart(): Observable<ShoppingCart> {
    let cartId = this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => {
          if (!x) return new ShoppingCart({});
          return new ShoppingCart(x.items);
        })
      );
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  clearCart() {
    let cartId = this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private getOrCreateCartId(): string {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private updateItem(product: Product, change: number) {
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: ShoppingCartItem) => {
        if (item) item$.update({ quantity: item.quantity + change });
        else item$.update({ ...product, quantity: 1 });
      });
  }
}
