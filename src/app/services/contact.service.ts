import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from '../models/contact';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private db: AngularFirestore) {}

  createContact(contact: Contact): Promise<any> {
    return this.db
      .collection<Contact>('contacts')
      .add({ ...contact })
      .catch((error) => {
        console.error('Erreur lors de la création du contact:', error);
        throw error;
      });
  }

  getContacts(): Observable<Contact[]> {
    return this.db
      .collection<Contact>('contacts', (ref) => ref.orderBy('date', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des contacts:', error);
          return throwError(() => error);
        }),
      );
  }

  deleteContact(id: string): Promise<void> {
    return this.db
      .doc(`contacts/${id}`)
      .delete()
      .catch((error) => {
        console.error('Erreur lors de la suppression du contact:', error);
        throw error;
      });
  }
}
