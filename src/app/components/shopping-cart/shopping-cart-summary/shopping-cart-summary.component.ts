import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
})
export class ShoppingCartSummaryComponent {
  constructor(
    public cartService: ShoppingCartService,
    public locService: LocationService
  ) {}
}
