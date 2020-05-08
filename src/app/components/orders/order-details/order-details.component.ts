import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<Order>;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrder(id);
  }
}
