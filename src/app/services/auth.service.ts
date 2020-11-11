import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
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
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.signOut();
  }
}
