import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent {
  orders$;

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getMyOrders();
  }
}
