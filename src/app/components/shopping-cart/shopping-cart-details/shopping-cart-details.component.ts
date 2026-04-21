import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styles: [],
  standalone: false,
})
export class ShoppingCartDetailsComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const cartId = this.route.snapshot.paramMap.get('id');

    this.cartService
      .getItems(cartId)
      .pipe(
        tap((items) => (this.cart = new ShoppingCart(items))),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
