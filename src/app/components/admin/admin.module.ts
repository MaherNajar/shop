import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import {
  NgbTypeaheadModule,
  NgbButtonsModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../commons/shared.module';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ProductPreviewModule } from '../products/product-preview/product-preview.module';

@NgModule({
  declarations: [
    ProductTableComponent,
    ProductFormComponent,
    OrderTableComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AngularFireStorageModule,
    NgbTypeaheadModule,
    NgbButtonsModule,
    NgbProgressbarModule,
    SharedModule,
    ProductPreviewModule,
  ],
})
export class AdminModule {}
