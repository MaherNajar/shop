import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent {
  constructor(public orderService: OrderService) {}
}
