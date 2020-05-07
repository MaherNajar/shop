import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

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
  userId: string;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    public cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(
      (user) => (this.userId = user ? user.uid : this.authService.newGuid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cartService.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }
}

interface Shipping {
  nom: string;
  adresse: string;
  adresseBis: string;
  ville: string;
}
