import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private locService: LocationService,
    private cartService: ShoppingCartService,
    private swUpdate: SwUpdate
  ) {}
  ngOnInit() {
    this.swUpdate.available.subscribe((event) => {
      if (
        confirm('Update Available. Refresh the page now to update the cache.')
      )
        location.reload();
    });

    setInterval(() => {
      this.swUpdate.checkForUpdate();
    }, 21600);
    this.locService.getLocation();
    this.cartService.getCart();
  }
}
