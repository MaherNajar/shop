import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
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

  constructor(public productService: ProductService) {
    productService.getAll().subscribe((products: Product[]) => {
      this.items = this.products = products;
    });
  }

  filter(query) {
    this.items = query
      ? this.products.filter((p) =>
          this.noralized(p.title).includes(this.noralized(query))
        )
      : this.products;
  }

  private noralized(title: string) {
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }
}
