import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private db: AngularFirestore
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
        if (user) return this.db.doc(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithRedirect(provider);
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);

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
