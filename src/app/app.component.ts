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
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          if (
            confirm(
              'Nouvelle version disponible. Charger le nouvelle version ?'
            )
          ) {
            window.location.reload();
          }
        }
      });
    }

    this.locService.getLocation();
    this.cartService.getCart();
  }
}
