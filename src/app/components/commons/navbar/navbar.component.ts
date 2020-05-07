import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    public cartService: ShoppingCartService
  ) {
    this.user$ = authService.user$;
  }

  signIn() {
    this.authService.googleSignin();
  }

  signOut() {
    this.authService.signOut();
  }
}
