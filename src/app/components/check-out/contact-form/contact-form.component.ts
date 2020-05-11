import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  email = '';
  message = '';

  user;

  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    public cartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async placeOrder() {
    const orderMail = this.user ? this.user.email : this.email;
    const order = new Order(
      orderMail,
      this.message,
      'confirmée',
      this.cartService.cart
    );
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }
}
