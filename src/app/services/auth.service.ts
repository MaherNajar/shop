import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$: Observable<User> = null;
  authState$ = authState(this.auth);

  constructor(private db: AngularFirestore) {
    this.user$ = this.authState$.pipe(
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
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    this.auth.signOut();
  }
}
