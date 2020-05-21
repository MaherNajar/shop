import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private db: AngularFirestore) {}

  getCustomers() {
    return this.db.collection<Customer>('customers').valueChanges();
  }

  getCustomer(email: string) {
    return this.db.doc<Customer>(`customers/${email}`).valueChanges();
  }
}
