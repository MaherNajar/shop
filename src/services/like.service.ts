import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { User } from "src/models/user";

@Injectable({
  providedIn: "root"
})
export class LikeService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get totalLikes() {
    return this.db.object("/likes/-L_P0eyAJeLJn4Ydmbvy").valueChanges();
  }

  save(liked) {
    this.authService.user$.pipe(take(1)).subscribe(async (user: User) => {
      await this.db.object("/users/" + user.uid).update({ liked });
      const log = { ...user, liked, datetime: dateNow() };
      let logsRef = this.db.list("logs");
      let likesRef = this.db.object("likes/-L_P0eyAJeLJn4Ydmbvy");

      likesRef
        .valueChanges()
        .pipe(take(1))
        .subscribe(async (l: any) => {
          if (!l.totalLikes) {
            likesRef.update({ totalLikes: 1 });
          } else {
            let newValue = l.totalLikes + (liked ? 1 : -1);
            likesRef.update({ totalLikes: newValue });
          }
          logsRef.push(log);
        });
    });
  }
}

function dateNow() {
  let date = new Date();
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
