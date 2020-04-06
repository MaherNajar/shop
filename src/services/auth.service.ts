import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { auth } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private afDb: AngularFireDatabase
  ) {
    afAuth
      .getRedirectResult()
      .then(({ user }) => {
        if (user) this.updateUserData(user);
      })
      .catch((err) => {
        console.log(err);
      });
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        if (user) return this.afDb.object(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    await this.afAuth.signInWithRedirect(provider);
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFireObject<User> = this.afDb.object(`users/${uid}`);

    const data = { uid, email, displayName, photoURL };

    return userRef.update(data);
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
