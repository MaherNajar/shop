import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'profile',
  template: `
    <div *ngIf="auth.user$ | async as user" class="text-center">
      <img [src]="user.photoURL" />
      <h5 class="mt-0">{{ user.displayName }}</h5>
      <p>Email : {{ user.email }}</p>
    </div>
  `,
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
