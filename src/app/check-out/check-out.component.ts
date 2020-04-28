import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart$ = this.shoppingCartService.cart$;
  }
}
