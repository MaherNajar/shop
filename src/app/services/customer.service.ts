import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private db: AngularFirestore) {}

  getCustomer(email: string) {
    return this.db.doc<Customer>(`customers/${email}`).valueChanges();
  }
}
