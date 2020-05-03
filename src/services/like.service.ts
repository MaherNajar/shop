import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  get totalLikes() {
    return this.db.doc('likes/-L_P0eyAJeLJn4Ydmbvy').valueChanges();
  }

  save(liked) {
    this.authService.user$.pipe(take(1)).subscribe(async (user: User) => {
      await this.db.doc('users/' + user.uid).update({ liked });
      const log = { ...user, liked, datetime: dateNow() };
      let logsRef = this.db.collection('logs');
      let likesRef = this.db.doc('likes/-L_P0eyAJeLJn4Ydmbvy');

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
          logsRef.add(log);
        });
    });
  }
}

function dateNow() {
  let date = new Date();
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
