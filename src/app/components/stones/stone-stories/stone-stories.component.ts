import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'stone-stories',
  templateUrl: './stone-stories.component.html',
  styleUrls: ['./stone-stories.component.css'],
})
export class StoneStoriesComponent {
  constructor(public productService: ProductService) {}

  hasStone(name: string) {
    return this.productService.product.stones.some((x) => x === name);
  }
}
