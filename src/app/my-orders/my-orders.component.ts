import { switchMap } from "rxjs/operators";
import { Component } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "my-orders",
  templateUrl: "./my-orders.component.html"
})
export class MyOrdersComponent {
  orders$;

  constructor(orderService: OrderService, authService: AuthService) {
    this.orders$ = authService.user$.pipe(
      switchMap(u => orderService.getOrdersByUser(u.uid))
    );
  }
}
