import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
  },

  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AdminGuard, AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
