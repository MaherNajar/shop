import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from './services/location.service';
import { filter, map } from 'rxjs/operators';

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
    const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map((evt) => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      }))
    );

    updatesAvailable.subscribe({
      next: (x) => {
        console.log(`current version: ${x.current}`);
        console.log(`available version: ${x.available}`);
        if (x.available > x.current) this.swUpdate.activateUpdate();
      },
      error: (e) => console.log(e),
    });

    this.locService.getLocation();
    this.cartService.getCart();
  }
}
