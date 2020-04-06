import { Component } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styles: [
    `
      table {
        width: 100%;
      }

      th.mat-sort-header-sorted {
        color: black;
      }
    `,
  ],
})
export class AdminProductsComponent {
  items: Product[] = [];
  products: Product[];

  constructor(productService: ProductService) {
    productService.getAll().subscribe((products: Product[]) => {
      this.items = this.products = products;
    });
  }

  filter(query) {
    this.items = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
