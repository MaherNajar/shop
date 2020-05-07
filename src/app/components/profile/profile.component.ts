import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'profile',
  template: `
    <div *ngIf="user$ | async as user" class="text-center">
      <img src="{{ user.photoURL }}" />
      <h5 class="mt-0">{{ user.displayName }}</h5>
      <p>Email : {{ user.email }}</p>
    </div>
  `,
})
export class ProfileComponent {
  user$: Observable<User>;
  constructor(auth: AuthService) {
    this.user$ = auth.user$;
  }
}
