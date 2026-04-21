import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styles: [],
  standalone: false,
})
export class ContactFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  @Input('message') message: string = '';
  @Input('requiredMessage') requiredMessage = false;
  @Output() onSendContactForm = new EventEmitter<any>();

  username: string = '';
  email: string = '';

  user: User;

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendMessage() {
    if (this.user) {
      this.username = this.user.displayName;
      this.email = this.user.email;
    }
    const form = {
      username: this.username,
      email: this.email,
      message: this.message,
    };
    this.onSendContactForm.emit(form);
    this.message = '';
  }
}
