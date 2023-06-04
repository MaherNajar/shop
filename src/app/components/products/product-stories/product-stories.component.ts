import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { StoneService } from 'src/app/services/stones.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'product-stories',
  templateUrl: './product-stories.component.html',
  styles: [
    `
      p,
      h4 {
        /* font-family: 'Comic Sans MS', cursive, sans-serif; */
        font-family: 'arial', sans-serif;
        text-align: justify;
      }

      p {
        font-size: 14px;
      }
    `,
  ],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(350, style({ opacity: 1 })),
      ]),
    ]),
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
