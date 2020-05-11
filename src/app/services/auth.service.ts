import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => (user ? this.getUser(user.uid) : of(null)))
    );
  }

  private getUser(uid: string) {
    return this.db
      .doc(`users/${uid}`)
      .valueChanges()
      .pipe(map((user) => new User(user)));
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
  }

  signOut() {
    this.router.navigate(['/']).finally(() => this.afAuth.signOut());
  }
}
