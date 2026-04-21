import { Injectable } from '@angular/core';

interface Toast {
  header: string;
  body: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];
  private toastTimeout = 5000; // 5 secondes

  show(header: string, body: string): void {
    const id = this.generateId();
    const toast: Toast = { header, body, id };
    this.toasts.push(toast);

    // Auto-remove toast après 5 secondes
    setTimeout(() => this.remove(toast), this.toastTimeout);
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
