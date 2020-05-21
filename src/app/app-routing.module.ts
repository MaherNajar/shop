import { AuthGuard } from './services/auth-guard.service';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminGuard } from './services/admin-guard.service';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'colliers',
    component: ProductsComponent,
  },
  {
    path: 'colliers/:id',
    component: ProductComponent,
  },
  {
    path: 'panier',
    component: ShoppingCartComponent,
  },
  {
    path: 'caisse',
    component: CheckOutComponent,
  },

  {
    path: 'profil/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commandes',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commandes/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/commandes',
    component: OrdersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/colliers',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/clients',
    component: CustomersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/clients/:email',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
