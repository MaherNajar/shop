import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: Order;
  subscription: Subscription;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    public locService: LocationService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.subscription = this.orderService.getOrder(id).subscribe((order) => {
      order.id = id;
      this.order = order;
    });
  }

  cancelOrder() {
    if (this.order.status === 'confirmée') {
      this.order.status = 'annulée';
      this.orderService.updateOrder(this.order);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
