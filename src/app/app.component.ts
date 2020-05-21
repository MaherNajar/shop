import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private locService: LocationService,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.locService.getLocation();
    this.cartService.getCart();
  }
}
