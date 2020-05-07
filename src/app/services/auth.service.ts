import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {
    afAuth
      .getRedirectResult()
      .then(({ user }) => {
        if (user) this.userService.createOrUpdateUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    this.user$ = afAuth.authState.pipe(
      switchMap((user) =>
        user ? this.userService.getUser(user.uid) : of(null)
      )
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithRedirect(provider);
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  get newGuid() {
    return this.userService.generateGuid();
  }
}
