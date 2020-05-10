import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders$;
  title: string;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    let path = this.route.snapshot.url[0].path;
    this.getOrders(path);
  }

  private getOrders(path) {
    if (path === 'admin') {
      this.title = 'Toutes les commandes';
      this.orders$ = this.orderService.getOrders();
    } else {
      this.title = 'Mes commandes';
      this.orders$ = this.orderService.getMyOrders();
    }
  }
}
