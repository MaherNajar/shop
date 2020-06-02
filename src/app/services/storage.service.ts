import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get(key: string) {
    if (this.isBrowser) return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  remove(key: string) {
    if (this.isBrowser) localStorage.removeItem(key);
  }

  clear() {
    if (this.isBrowser) localStorage.clear();
  }
}
