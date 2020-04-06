import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Component, Input } from "@angular/core";
import { Product } from "../../models/product";
import { ShoppingCart } from "../../models/shopping-cart";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html"
})
export class ProductCardComponent {
  constructor(private cartService: ShoppingCartService) {}

  @Input("product")
  product: Product;
  @Input("show-actions")
  showActions = true;
  @Input("shopping-cart")
  shoppingCart: ShoppingCart;

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
