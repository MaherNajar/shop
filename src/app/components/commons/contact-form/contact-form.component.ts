import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styles: [],
})
export class ContactFormComponent implements OnInit {
  constructor(private authService: AuthService) {}

  @Input('message') message: string = '';
  @Input('requiredMessage') requiredMessage = false;
  @Output() onSendContactForm = new EventEmitter<any>();

  username: string = '';
  email: string = '';

  user: User;

  ngOnInit() {
    this.authService.user$.subscribe((user) => (this.user = user));
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
