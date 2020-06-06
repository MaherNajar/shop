import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgbToastModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { ToastsComponent } from './toasts/toasts.component';
import { SizePipe } from './size.pipe';
import { NoImgSizePipe } from './no-img-size.pipe';

const components = [NavbarComponent, ToastsComponent, SizePipe, NoImgSizePipe];

const modules = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  NgbToastModule,
  NgbDropdownModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
