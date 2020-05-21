import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Visitor } from 'src/app/models/customer';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent {
  visitor: Visitor = {
    email: '',
    message: '',
    ip: '',
    loc: '',
  };

  user;

  constructor(
    public cartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private locService: LocationService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async placeOrder() {
    if (this.user) this.visitor.email = this.user.email;
    const location = await this.locService.location$.toPromise();
    const order = new Order(
      { ...this.visitor, ...location },
      this.cartService.cart
    );
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/commandes', result.id]);
  }
}
