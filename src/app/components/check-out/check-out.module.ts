import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { SharedModule } from '../commons/shared.module';

@NgModule({
  declarations: [CheckOutComponent, ShoppingCartSummaryComponent],
  imports: [CommonModule, SharedModule, CheckOutRoutingModule],
})
export class CheckOutModule {}
