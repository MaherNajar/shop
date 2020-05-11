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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product/product-quantity/product-quantity.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart/shopping-cart-summary/shopping-cart-summary.component';
import { ContactFormComponent } from './components/check-out/contact-form/contact-form.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ShoppingCartSummaryComponent,
    ContactFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
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
