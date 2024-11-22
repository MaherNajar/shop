import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noImgSize',
    standalone: false
})
export class NoImgSizePipe implements PipeTransform {
  transform(url: string, size: '100' | '400'): string {
    if (!url) return url;
    const tab = url.split('.jpg');
    const frag = size === '100' ? '_100x100.jpg' : '_400x300.jpg';
    tab.splice(1, 0, frag);
    return tab.join('');
  }
}
