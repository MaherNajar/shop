import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from './services/location.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private locService: LocationService,
    private cartService: ShoppingCartService,
    private swUpdate: SwUpdate,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.swUpdate.available.subscribe((event) => {
      location.reload();
      this.toastService.show('✨', 'Le site a été mis à jour');
    });

    setInterval(() => {
      this.swUpdate.checkForUpdate();
    }, 21600);
    this.locService.getLocation();
    this.cartService.getCart();
  }
}
