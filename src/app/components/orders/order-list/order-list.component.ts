import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(
    private orderService: OrderService,
    public locService: LocationService
  ) {}
  ngOnInit() {
    this.orders$ = this.orderService.getMyOrders();
  }
}