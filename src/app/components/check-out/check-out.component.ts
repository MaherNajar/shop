import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent {
  username = '';
  email = '';
  message = '';

  user: User;

  constructor(
    public cartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private locService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async placeOrder() {
    if (this.user) {
      this.username = this.user.displayName;
      this.email = this.user.email;
    }
    const { ip, loc } = await this.locService.location$.toPromise();
    const order = new Order(
      this.username,
      this.email,
      this.message,
      ip,
      loc,
      this.cartService.cart
    );
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/commandes', result.id]);
  }
}
