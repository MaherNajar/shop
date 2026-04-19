import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../models/customer';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private db: AngularFirestore) {}

  getCustomer(email: string): Observable<Customer> {
    return this.db
      .doc<Customer>(`customers/${email}`)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération du client:', error);
          return throwError(() => error);
        }),
      );
  }
}
