import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private db: AngularFirestore) {}

  createContact(contact: Contact) {
    return this.db.collection<Contact>('contacts').add({ ...contact });
  }

  getContacts() {
    return this.db
      .collection<Contact>('contacts', (ref) => ref.orderBy('date', 'desc'))
      .valueChanges();
  }
}
