import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private locService: LocationService,
    private cartService: ShoppingCartService,
    private swUpdate: SwUpdate,
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          if (event.type === 'VERSION_READY') {
            if (
              confirm(
                'Nouvelle version disponible. Charger le nouvelle version ?',
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
