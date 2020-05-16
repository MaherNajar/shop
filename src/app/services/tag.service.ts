import { Injectable } from '@angular/core';

export interface Tag {
  key: string;
  color: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private Tags = [
    { key: 'ergg', color: 'yellow', name: 'banane' },
    { key: 'ergetrg', color: 'red', name: 'pomme' },
    { key: 'rfhrt', color: 'orange', name: 'orange' },
    { key: 'zfzerf', color: 'green', name: 'salade' },
    { key: 'yhtg', color: 'gold', name: 'cereale' },
  ];
  getTags() {
    return this.Tags;
  }
}
