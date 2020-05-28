import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-stories',
  templateUrl: './product-stories.component.html',
  styles: [
    `
      p,
      h4 {
        font-family: 'Comic Sans MS', cursive, sans-serif;
        text-align: justify;
      }

      p {
        font-size: 14px;
      }

      img {
        text-align: center;
      }
    `,
  ],
})
export class ProductStoriesComponent {
  constructor(public productService: ProductService) {}
  @Input('product') product: Product;
  hasStone(name: string) {
    return this.product.stones.some((x) => x === name);
  }
}
