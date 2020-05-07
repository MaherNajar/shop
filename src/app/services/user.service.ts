import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  private userRef(uid: string) {
    return this.db.doc(`users/${uid}`);
  }

  getUser(uid: string): Observable<any> {
    return this.userRef(uid).valueChanges().pipe(take(1));
  }

  createOrUpdateUser({ displayName, email, phoneNumber, photoURL, uid }) {
    const user = { displayName, email, phoneNumber, photoURL, uid };

    this.getUser(uid).subscribe((userDb) => {
      let lastTimeConnected = Date.now();

      if (!userDb) this.userRef(uid).set({ ...user, lastTimeConnected });
      else
        this.userRef(uid).update({
          ...user,
          userType: 'registered',
          liked: false,
          lastTimeConnected,
        });
    });
  }

  generateGuid() {
    return this.db.createId();
  }
}
