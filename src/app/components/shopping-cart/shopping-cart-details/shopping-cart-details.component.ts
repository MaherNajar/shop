import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
    selector: 'app-shopping-cart-details',
    templateUrl: './shopping-cart-details.component.html',
    styles: [],
    standalone: false
})
export class ShoppingCartDetailsComponent implements OnInit {
  cart;
  subscription: Subscription;
  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cartId = this.route.snapshot.paramMap.get('id');

    this.subscription = this.cartService
      .getItems(cartId)
      .pipe(map((items: any) => (this.cart = new ShoppingCart(items))))
      .subscribe();
  }
}
