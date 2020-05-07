import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styles: [
    `
      #heart {
        cursor: pointer;
      }
    `,
  ],
})
export class LikeComponent {
  liked;
  totalLikes = 100;
  constructor(auth: AuthService) {
    auth.user$.subscribe((user: User) => {
      if (user) this.liked = user.liked;
    });
  }

  onClickLiked() {
    this.liked = !this.liked;
    this.totalLikes += this.liked ? 1 : -1;
  }
}
