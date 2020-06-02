import { Component, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './product-table.component.html',
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
export class ProductTableComponent {
  @ViewChild('modal') modal: ElementRef;
  items: Product[] = [];
  products: Product[];
  imgNotAvailable = environment.imgNotAvailable;

  constructor(
    public productService: ProductService,
    private ngbModal: NgbModal
  ) {
    productService.getAllProducts().subscribe((products: Product[]) => {
      this.items = this.products = products;
    });
  }

  openModal() {
    this.ngbModal.open(this.modal, {
      centered: true,
      size: 'md',
    });
  }

  filter(query: string) {
    this.items = query
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  deleteProduct(product: Product) {
    if (product.status === 'réservé') {
      return this.openModal();
    }
    this.productService.delete(product);
  }
}
