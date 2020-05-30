import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { StoneService } from 'src/app/services/stones.service';

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
    `,
  ],
})
export class ProductStoriesComponent implements OnInit {
  @Input('product') product: Product;
  stories;
  constructor(private stoneService: StoneService) {}
  ngOnInit() {
    this.stories = this.stoneService.getStories(this.product);
  }
}
