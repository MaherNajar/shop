import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { NgbToastModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { ToastsComponent } from './toasts/toasts.component';
import { SizePipe } from './size.pipe';
import { NoImgSizePipe } from './no-img-size.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';

const components = [
  NavbarComponent,
  ToastsComponent,
  SizePipe,
  NoImgSizePipe,
  ContactFormComponent,
];

const modules = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  FormsModule,
  NgbToastModule,
  NgbDropdownModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
