import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../commons/shared.module';
import { ShoppingCartDetailsComponent } from './shopping-cart-details/shopping-cart-details.component';

@NgModule({
  declarations: [ShoppingCartComponent, ShoppingCartDetailsComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule],
})
export class ShoppingCartModule {}
