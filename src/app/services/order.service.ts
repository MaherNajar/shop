import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private cartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  getOrder(orderId: string): Observable<Order> {
    return this.db.doc<Order>('orders/' + orderId).valueChanges();
  }

  placeOrder(order) {
    let result = this.db.collection('orders').add({ ...order });
    this.cartService.clearCart();
    return result;
  }

  updateOrder(order: Order) {
    this.db.doc(`orders/${order.id}`).update({ ...order });
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .collection<Order>('orders', (ref) => ref.orderBy('datePlaced', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  getMyOrders(): Observable<Order[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.db
          .collection<Order>('orders', (ref) =>
            ref.where('email', '==', user.email).orderBy('datePlaced', 'desc')
          )
          .valueChanges({ idField: 'id' });
      })
    );
  }
}
