import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';

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
export class ProductFilterComponent implements OnInit {
  @Input()
  category: string;
  constructor(public catService: CategoryService) {}

  ngOnInit() {}
}
