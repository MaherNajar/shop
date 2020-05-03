import { Component, OnInit, Input } from '@angular/core';
import { Categories } from 'src/services/categories';

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
  categories;
  @Input()
  category: string;
  constructor() {
    this.categories = Categories;
  }

  ngOnInit() {}
}
