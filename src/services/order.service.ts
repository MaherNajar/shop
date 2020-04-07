import { ShoppingCartService } from './../services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map((o: any) => ({ key: o.payload.key, ...o.payload.val() }))
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/orders', (ref) => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map((o: any) => ({ key: o.payload.key, ...o.payload.val() }))
        )
      );
  }

  getOrder(orderId: string): Observable<Order> {
    return this.db
      .object('/orders/' + orderId)
      .snapshotChanges()
      .pipe(map((o: any) => ({ key: o.payload.key, ...o.payload.val() })));
  }
}
