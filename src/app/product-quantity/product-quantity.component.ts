import { Component, Input } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Product } from "../../models/product";
import { ShoppingCart } from "../../models/shopping-cart";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html"
})
export class ProductQuantityComponent {
  constructor(private cartService: ShoppingCartService) {}

  @Input("product")
  product: Product;

  @Input("shopping-cart")
  shoppingCart: ShoppingCart;

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    if (this.shoppingCart.getQuantity(this.product) === 0) return;
    this.cartService.removeFromCart(this.product);
  }
}
