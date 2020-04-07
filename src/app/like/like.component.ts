import { Component } from '@angular/core';
import { LikeService } from '../../services/like.service';
import { User } from '../../models/user';
import { AuthService } from 'src/services/auth.service';
import { Observable } from 'rxjs';

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
  likes$: Observable<any>;

  constructor(private likeService: LikeService, auth: AuthService) {
    this.likes$ = likeService.totalLikes;
    auth.user$.subscribe((user: User) => {
      if (user) this.liked = user.liked;
    });
  }

  changeHeart() {
    this.liked = !this.liked;
    this.likeService.save(this.liked);
  }
}
