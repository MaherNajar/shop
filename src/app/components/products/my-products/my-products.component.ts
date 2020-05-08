import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
})
export class MyProductsComponent {
  items: Product[] = [];
  products: Product[];

  constructor(public productService: ProductService) {
    productService.getMyProducts().subscribe((products: Product[]) => {
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
