import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  title: string;
  showCustomer: boolean;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public locService: LocationService
  ) {}
  ngOnInit() {
    let path = this.route.snapshot.url[0].path;
    this.getOrders(path);
  }

  private getOrders(path) {
    if (path === 'admin') {
      this.title = 'Toutes les commandes';
      this.showCustomer = true;
      this.orders$ = this.orderService.getOrders();
    } else {
      this.title = 'Mes commandes';
      this.orders$ = this.orderService.getMyOrders();
    }
  }
}
