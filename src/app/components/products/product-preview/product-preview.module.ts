import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductPreviewComponent } from './product-preview.component';
import { SharedModule } from '../../commons/shared.module';

@NgModule({
  declarations: [ProductPreviewComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [ProductPreviewComponent],
})
export class ProductPreviewModule {}
