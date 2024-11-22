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

      #exclusifs {
        letter-spacing: 0.5em;
        font-weight: bolder;
        /* Clip Background Image */
        background: url(https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fexplosion2_400x300.jpg?alt=media&token=6e566d56-25f0-465d-ac8e-30ab80a1d70d)
          repeat-y;
        -webkit-background-clip: text;
        background-clip: text;
        /* Animate Background Image */
        -webkit-text-fill-color: transparent;
        -webkit-animation: aitf 5s linear infinite;
        /* Activate hardware acceleration for smoother animations */
        -webkit-transform: translate3d(0, 0, 0);
        -webkit-backface-visibility: hidden;
      }

      /* Animate Background Image */
      @-webkit-keyframes aitf {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
    `,
    ],
    standalone: false
})
export class ProductFilterComponent {
  @Input('pierre') pierre;
  @Input('couleur') couleur;
  @Input('category') category;
  @Input('count') count: number;
  constructor(
    public colorService: ColorService,
    public stoneService: StoneService
  ) {}
}
