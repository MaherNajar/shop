import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingCart } from "../../models/shopping-cart";

@Component({
  selector: "shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: ShoppingCartService) {}
  cart$: Observable<ShoppingCart>;

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
