import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .grayFilter {
        filter: grayscale(1);
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  user: User = null;
  constructor(
    private authService: AuthService,
    public cartService: ShoppingCartService
  ) {}
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  googleSignin() {
    this.authService.googleSignin();
  }

  signOut() {
    this.authService.signOut();
  }
}
