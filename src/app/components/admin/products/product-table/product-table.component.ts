import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './product-table.component.html',
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
export class ProductTableComponent {
  items: Product[] = [];
  products: Product[];

  constructor(public productService: ProductService) {
    productService.getAllProducts().subscribe((products: Product[]) => {
      this.items = this.products = products;
    });
  }

  filter(query: string) {
    this.items = query
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
