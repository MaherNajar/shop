import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { CheckOutRoutingModule } from './check-out-routing.module';

@NgModule({
  declarations: [CheckOutComponent, ShoppingCartSummaryComponent],
  imports: [CommonModule, FormsModule, CheckOutRoutingModule],
})
export class CheckOutModule {}
