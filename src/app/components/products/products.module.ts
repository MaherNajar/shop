import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductStoriesComponent } from './product-stories/product-stories.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductPreviewModule } from './product-preview/product-preview.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../commons/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFilterComponent,
    ProductStoriesComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductPreviewModule,
    InfiniteScrollModule,
    SharedModule,
  ],
})
export class ProductsModule {}
