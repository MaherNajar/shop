import { Component, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
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
export class ProductDetailsComponent {
  @ViewChild('modal') modal: ElementRef;

  selectedPicture: number = 0;

  constructor(
    public cartService: ShoppingCartService,
    private ngbModal: NgbModal,
    public productService: ProductService,
    public stoneService: StoneService,
    public colorService: ColorService
  ) {}

  get mainPicture() {
    return this.productService.product.gallery[this.selectedPicture];
  }

  openModal() {
    this.ngbModal.open(this.modal, {
      centered: true,
      size: 'lg',
    });
  }

  addToCart() {
    this.cartService.addToCart(this.productService.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.productService.product);
  }
}
