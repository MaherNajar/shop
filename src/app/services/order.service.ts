import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private cartService: ShoppingCartService,
    private authService: AuthService,
  ) {}

  getOrder(orderId: string): Observable<Order> {
    return this.db.doc<Order>('orders/' + orderId).valueChanges();
  }

  async placeOrder(order: Order): Promise<any> {
    try {
      const result = await this.db.collection('orders').add({ ...order });
      await this.cartService.clearCart();
      return result;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    }
  }

  updateOrder(order: Order): Promise<void> {
    return this.db
      .doc(`orders/${order.id}`)
      .update({ ...order })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la commande:', error);
        throw error;
      });
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .collection<Order>('orders', (ref) => ref.orderBy('datePlaced', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  getMyOrders(): Observable<Order[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.db
          .collection<Order>('orders', (ref) =>
            ref.where('email', '==', user.email).orderBy('datePlaced', 'desc'),
          )
          .valueChanges({ idField: 'id' })
          .pipe(
            catchError((error) => {
              console.error(
                'Erreur lors de la récupération des commandes:',
                error,
              );
              return throwError(() => error);
            }),
          );
      }),
    );
  }
}
