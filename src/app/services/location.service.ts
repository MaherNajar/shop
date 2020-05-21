import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  location$: Observable<Location>;

  getLocation() {
    this.location$ = this.http
      .get('https://www.cloudflare.com/cdn-cgi/trace', { responseType: 'text' })
      .pipe(
        take(1),
        map((res: string) => {
          return new Location(res);
        })
      );
  }
}

export class Location {
  ip: string;
  loc: string;
  constructor(init: string) {
    let data = init
      .trim()
      .split(/\s+/)
      .filter((x) => x.startsWith('loc') || x.startsWith('ip'));
    this.ip = data[0].split('=')[1];
    this.loc = data[1].split('=')[1];
  }

  get isInTN() {
    return this.loc.includes('TN');
  }

  get displayCurrency() {
    return this.isInTN ? 'TND' : '€';
  }
}
