import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent {
  email = '';
  message = '';

  user;

  constructor(
    public cartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async placeOrder() {
    const orderMail = this.user ? this.user.email : this.email;
    const order = new Order(orderMail, this.message, this.cartService.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/commandes', result.id]);
  }
}
