import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.css'],
    standalone: false
})
export class ToastsComponent {
  constructor(public toastService: ToastService) {}
}
