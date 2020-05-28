import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './products/product-form/product-form.component';
import {
  NgbTypeaheadModule,
  NgbButtonsModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../commons/shared.module';
import { ProductPreviewComponent } from './products/product-preview/product-preview.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';

@NgModule({
  declarations: [
    ProductTableComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    OrderTableComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbButtonsModule,
    SharedModule,
  ],
})
export class AdminModule {}
