import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AdminGuard } from 'src/app/services/admin.guard';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {
    path: 'bijoux',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'bijoux/archives',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'bijoux/vendus',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'bijoux/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'commandes',
    component: OrderTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'client/:email',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
