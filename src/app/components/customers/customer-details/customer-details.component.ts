import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styles: [],
})
export class CustomerDetailsComponent {
  customer$: Observable<Customer>;
  constructor(customerService: CustomerService, route: ActivatedRoute) {
    const email = route.snapshot.paramMap.get('email');
    this.customer$ = customerService.getCustomer(email);
  }
}
