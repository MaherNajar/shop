import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generateTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph
      {
        name: 'og:url',
        content: `https://arcenperles-75.web.app${this.router.url}`,
      },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'résumé' },
      { name: 'twitter:site', content: '@arc_en_perles' },
    ]);
  }
}
