import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'profile',
  template: `
    <div *ngIf="user$ | async as user" class="text-center">
      <img
        width="200px"
        height="200px"
        class="img-fluid img-thumbnail"
        [src]="user.photoURL"
      />
      <h5 class="mt-3">{{ user.displayName }}</h5>
      <p>Email : {{ user.email }}</p>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  constructor(private db: AngularFirestore, private router: ActivatedRoute) {}
  ngOnInit() {
    const userId = this.router.snapshot.paramMap.get('id');
    this.user$ = this.db.doc<User>(`users/${userId}`).valueChanges();
  }
}
