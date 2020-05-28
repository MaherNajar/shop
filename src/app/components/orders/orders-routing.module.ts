import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin-guard.service';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: OrderListComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: OrderListComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: ':id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
