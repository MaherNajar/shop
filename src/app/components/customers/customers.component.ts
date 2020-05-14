import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [],
})
export class CustomersComponent {
  customers$: Observable<Customer[]>;
  constructor(customerService: CustomerService) {
    this.customers$ = customerService.getCustomers();
  }
}
