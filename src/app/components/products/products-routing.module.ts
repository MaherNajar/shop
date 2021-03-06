import { ProductPageComponent } from './product-page/product-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'colliers', component: ProductListComponent },
  { path: 'bracelets-bagues-bo', component: ProductListComponent },
  { path: 'exclusifs', component: ProductListComponent },
  { path: 'pierre/:pierre', component: ProductListComponent },
  { path: 'couleur/:couleur', component: ProductListComponent },
  { path: ':id', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
