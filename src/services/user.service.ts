import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: User) {
    this.db.doc('users/' + user.uid).update({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isAdmin: true,
      liked: false,
    });
  }

  get(uid: string): Observable<User> {
    return this.db
      .doc<User>('users/' + uid)
      .valueChanges()
      .pipe(take(1));
  }

  generateGuid() {
    return this.db.createId();
  }
}
