import { ShoppingCartService } from './../services/shopping-cart.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private cartService: ShoppingCartService
  ) {}

  placeOrder(order) {
    let result = this.db.collection('orders').add(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .collection('orders')
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map((o: any) => ({ key: o.payload.key, ...o.payload.val() }))
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .collection('orders', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map((orders) =>
          orders.map((o: any) => ({ key: o.payload.key, ...o.payload.val() }))
        )
      );
  }

  getOrder(orderId: string): Observable<Order> {
    return this.db
      .collection('orders/' + orderId)
      .snapshotChanges()
      .pipe(map((o: any) => ({ key: o.payload.key, ...o.payload.val() })));
  }
}
