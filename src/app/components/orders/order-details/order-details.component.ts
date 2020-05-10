import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.orderService.getOrder(id).subscribe((order) => {
      order.id = id;
      this.order = order;
    });
  }

  updateStatus() {
    switch (this.order.status) {
      case 'sold':
        break;
      case 'confirmed':
        this.order.status = 'canceled';
        break;
      case 'canceled':
        this.order.status = 'confirmed';
        break;
      default:
        break;
    }
    this.orderService.updateOrder(this.order);
  }
}
