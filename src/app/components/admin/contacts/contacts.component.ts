import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  subscription: Subscription;
  constructor(private contactService: ContactService) {}

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
