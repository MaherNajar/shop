import { Component, Input } from '@angular/core';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styles: [
    `
      ul {
        padding-inline-start: 2px;
        margin-top: 1rem;
      }
      .Color {
        display: inline;
      }

      .underline {
        text-decoration: underline;
      }
    `,
  ],
})
export class ProductFilterComponent {
  @Input('pierre') pierre;
  @Input('couleur') couleur;
  @Input('category') category;
  @Input('productsCount') productsCount: number;
  @Input('filteredCount') filteredCount: number;
  constructor(
    public colorService: ColorService,
    public stoneService: StoneService
  ) {}
}
