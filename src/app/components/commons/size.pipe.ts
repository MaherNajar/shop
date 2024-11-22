import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'size',
    standalone: false
})
export class SizePipe implements PipeTransform {
  transform(url: string, size: '100' | '400'): string {
    if (!url) return url;
    const tab = url.split('?');
    const frag = size === '100' ? '_100x100?' : '_400x300?';
    tab.splice(1, 0, frag);
    return tab.join('');
  }
}
