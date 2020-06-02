import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { LocationService } from 'src/app/services/location.service';

@Component({
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  subscription: Subscription;
  constructor(
    private orderService: OrderService,
    public locService: LocationService
  ) {}
  ngOnInit() {
    this.subscription = this.orderService
      .getOrders()
      .subscribe((orders) => (this.filteredOrders = this.orders = orders));
  }

  filter(query: string) {
    this.filteredOrders = query
      ? this.orders.filter((order) =>
          order.email.toLowerCase().includes(query.toLowerCase())
        )
      : this.orders;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
