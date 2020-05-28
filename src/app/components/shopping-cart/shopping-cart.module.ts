import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../commons/shared.module';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule],
})
export class ShoppingCartModule {}
