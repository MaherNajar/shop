import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private cartService: ShoppingCartService,
    private afAuth: AngularFireAuth
  ) {}

  placeOrder(order) {
    let result = this.db.collection('orders').add(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .collection<Order>('orders', (ref) => ref.orderBy('datePlaced', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  getMyOrders(): Observable<Order[]> {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.db
          .collection<Order>('orders', (ref) =>
            ref.where('userId', '==', user.uid).orderBy('totalPrice')
          )
          .valueChanges({ idField: 'id' });
      })
    );
  }

  getOrder(orderId: string): Observable<Order> {
    return this.db.doc<Order>('orders/' + orderId).valueChanges();
  }
}
