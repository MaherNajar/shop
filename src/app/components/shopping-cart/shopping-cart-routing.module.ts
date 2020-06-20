import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartDetailsComponent } from './shopping-cart-details/shopping-cart-details.component';

const routes: Routes = [
  { path: '', component: ShoppingCartComponent },
  { path: ':id', component: ShoppingCartDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
