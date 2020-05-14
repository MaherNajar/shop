import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
})
export class SizePipe implements PipeTransform {
  transform(url: string, size: '200' | '400' | '680'): string {
    const tab = url.split('?');
    const frag = `_${size}x${size}?`;
    tab.splice(1, 0, frag);
    return tab.join('');
  }
}
