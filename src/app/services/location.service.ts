import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  location$: Observable<Location>;

  getLocation(): Observable<Location> {
    this.location$ = this.http
      .get('https://www.cloudflare.com/cdn-cgi/trace', { responseType: 'text' })
      .pipe(
        take(1),
        map((res: string) => new Location(res)),
        catchError((error) => {
          console.error(
            'Erreur lors de la récupération de la localisation:',
            error,
          );
          return throwError(() => error);
        }),
      );
    return this.location$;
  }
}

export class Location {
  ip: string = '';
  loc: string = '';
  isInTN: boolean = false;

  constructor(init: string) {
    try {
      const data = init
        .trim()
        .split(/\s+/)
        .filter((x) => x.startsWith('loc') || x.startsWith('ip'));

      if (data.length >= 2) {
        this.ip = data[0].split('=')[1] || '';
        this.loc = data[1].split('=')[1] || '';
        this.isInTN = this.loc.includes('TN');
      }
    } catch (error) {
      console.error('Erreur lors du parsing de la localisation:', error);
    }
  }

  get displayCurrency(): string {
    return this.isInTN ? 'TND' : '€';
  }
}
