import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/services/order.service";

@Component({
  selector: "order-details",
  templateUrl: "./order-details.component.html"
})
export class OrderDetailsComponent implements OnInit {
  order$;
  constructor(router: ActivatedRoute, orderService: OrderService) {
    const id = router.snapshot.paramMap.get("id");
    this.order$ = orderService.getOrder(id);
  }

  ngOnInit() {}
}
