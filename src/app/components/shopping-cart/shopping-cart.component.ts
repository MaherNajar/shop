import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  constructor(public cartService: ShoppingCartService) {}
}
