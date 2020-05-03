import { ShoppingCart } from './../../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Order } from 'src/models/order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
})
export class ShippingFormComponent implements OnInit {
  shipping: Shipping = {
    nom: '',
    adresse: '',
    adresseBis: '',
    ville: '',
  };
  subscription: Subscription;
  userId: string;
  @Input() cart: ShoppingCart;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      (user) => (this.userId = user ? user.uid : this.authService.newGuid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

interface Shipping {
  nom: string;
  adresse: string;
  adresseBis: string;
  ville: string;
}
