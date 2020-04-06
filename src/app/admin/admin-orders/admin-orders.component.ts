import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: "app-admin-orders",
  templateUrl: "./admin-orders.component.html"
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }

  ngOnInit() {}
}
