import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';
import { ProductQuantityComponent } from './components/product/product-quantity/product-quantity.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { StoneStoriesComponent } from './components/stones/stone-stories/stone-stories.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart/shopping-cart-summary/shopping-cart-summary.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CustomersComponent } from './components/customers/customers.component';

import { ToastsComponent } from './components/commons/toasts/toasts.component';
import { SizePipe } from './components/commons/size.pipe';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ShoppingCartSummaryComponent,
    ProfileComponent,
    CustomersComponent,
    ToastsComponent,
    SizePipe,
    StoneStoriesComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
