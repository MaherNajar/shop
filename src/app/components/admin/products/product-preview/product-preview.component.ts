import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styles: [
    `
      #mainpic {
        cursor: pointer;
      }
      .selected {
        border: 1px groove lightgrey;
      }
      .notSelected {
        transition: opacity 0.1s;
        transition-property: opacity;
        transition-duration: 0.1s;
        transition-timing-function: ease;
        transition-delay: 0s;
        opacity: 0.6;
      }
    `,
  ],
})
export class ProductPreviewComponent {
  @ViewChild('modal') modal: ElementRef;
  @Input('product') product: Product;
  selectedPicture: number = 0;

  constructor(
    private ngbModal: NgbModal,
    public productService: ProductService,
    public stoneService: StoneService,
    public colorService: ColorService
  ) {}

  get mainPicture() {
    return this.product.gallery[this.selectedPicture];
  }

  openModal() {
    this.ngbModal.open(this.modal, {
      centered: true,
      size: 'lg',
    });
  }
}
