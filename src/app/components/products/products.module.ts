import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductStoriesComponent } from './product-stories/product-stories.component';
import { SharedModule } from '../commons/shared.module';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFilterComponent,
    ProductPreviewComponent,
    ProductStoriesComponent,
    ProductPageComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
