import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(
    private orderService: OrderService,
    public locService: LocationService
  ) {}
  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }
}
