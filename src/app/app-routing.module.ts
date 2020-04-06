import { ProductFormComponent } from "./product-form/product-form.component";
import { AdminGuard } from "../services/admin-guard.service";
import { AuthGuard } from "../services/auth-guard.service";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { ProductsComponent } from "./products/products.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent
  },
  {
    path: "check-out",
    component: CheckOutComponent
  },
  {
    path: "order-success/:id",
    component: OrderSuccessComponent
  },
  {
    path: "my/orders",
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "order-details/:id",
    component: OrderDetailsComponent
  },
  {
    path: "admin/products/new",
    component: ProductFormComponent
  },
  {
    path: "admin/products/:id",
    component: ProductFormComponent
  },
  {
    path: "admin/products",
    component: AdminProductsComponent,
    canActivate: [AdminGuard, AuthGuard]
  },
  {
    path: "admin/orders",
    component: AdminOrdersComponent,
    canActivate: [AdminGuard, AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
