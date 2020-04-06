import { CategoryService } from "../../../services/category.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styles: [
    `
      .sticky-top {
        top: 80px;
      }
    `
  ]
})
export class ProductFilterComponent implements OnInit {
  categories;
  @Input()
  category: string;
  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getAll();
  }

  ngOnInit() {}
}
