import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './order-list.component.html',
    standalone: false
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.orders$ = this.orderService.getMyOrders();
  }
}
