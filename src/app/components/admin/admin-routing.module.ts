import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AdminGuard } from 'src/app/services/admin.guard';

const routes: Routes = [
  {
    path: 'colliers',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'colliers/archives',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'colliers/:id',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
