import { Component, Input } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styles: [
    `
      .sticky-top {
        top: 80px;
      }
    `,
  ],
})
export class ProductFilterComponent {
  @Input()
  tag: string;
  constructor(public tagService: TagService) {}
}
