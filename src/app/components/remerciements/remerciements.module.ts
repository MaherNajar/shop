import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemerciementsComponent } from './remerciements.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: RemerciementsComponent }];

@NgModule({
  declarations: [RemerciementsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemerciementsModule {}
