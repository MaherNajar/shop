import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/products/my-products/my-products.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'my/products',
    component: MyProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
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
    path: 'my/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
