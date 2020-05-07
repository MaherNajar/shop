import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
})
export class ShoppingCartSummaryComponent {
  constructor(public cartService: ShoppingCartService) {}
}
