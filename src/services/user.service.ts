import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { User } from "src/models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: User) {
    this.db.object("/users/" + user.uid).update({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isAdmin: true,
      liked: false
    });
  }

  get(uid: string): Observable<User> {
    return this.db
      .object<User>("/users/" + uid)
      .valueChanges()
      .pipe(take(1));
  }

  generateGuid() {
    return this.db.createPushId();
  }
}
