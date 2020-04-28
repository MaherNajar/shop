import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user: User;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, cartService: ShoppingCartService) {
    auth.user$.subscribe((u) => (this.user = u));
    this.cart$ = cartService.cart$;
  }

  signIn() {
    this.auth.googleSignin();
  }

  signOut() {
    this.auth.signOut();
  }
}
