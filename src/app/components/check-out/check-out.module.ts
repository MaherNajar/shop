import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [CheckOutComponent, ShoppingCartSummaryComponent],
  imports: [CommonModule, FormsModule],
})
export class CheckOutModule {}
