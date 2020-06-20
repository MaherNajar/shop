import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  subscription: Subscription;
  constructor(
    private contactService: ContactService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subscription = this.contactService
      .getContacts()
      .subscribe(
        (contacts) => (this.filteredContacts = this.contacts = contacts)
      );
  }

  filter(query: string) {
    this.filteredContacts = query
      ? this.contacts.filter(
          (contact) =>
            contact.email.toLowerCase().includes(query.toLowerCase()) ||
            contact.username.toLowerCase().includes(query.toLowerCase())
        )
      : this.contacts;
  }

  async deleteContact(id: string) {
    try {
      await this.contactService.deleteContact(id);
      this.toastService.show('Succès !', 'Le contact a bien été supprimé !');
    } catch (error) {
      this.toastService.show(
        'Echec',
        "Le contact n'a pas pu être supprimé, veuillez rééssayer."
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
