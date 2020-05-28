import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';

const routes: Routes = [
  { path: 'colliers', component: ProductTableComponent },
  { path: 'colliers/:id', component: ProductFormComponent },
  {
    path: 'commandes',
    component: OrderTableComponent,
  },
  {
    path: 'client/:email',
    component: CustomerDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
