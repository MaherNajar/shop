import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    standalone: false
})
export class CheckOutComponent {
  constructor(
    public cartService: ShoppingCartService,
    private orderService: OrderService,
    private locService: LocationService,
    private router: Router
  ) {}

  async placeOrder({ username, email, message }) {
    const { ip, loc } = await this.locService.location$.toPromise();
    const order = new Order(
      username,
      email,
      message,
      ip,
      loc,
      this.cartService.cart
    );
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/commandes', result.id]);
  }
}
