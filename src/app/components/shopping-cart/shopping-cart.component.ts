import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  constructor(
    public cartService: ShoppingCartService,
    public locService: LocationService
  ) {}
}
