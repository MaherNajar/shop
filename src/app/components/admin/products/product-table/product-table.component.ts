import { Component, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-table.component.html',
  styles: [
    `
      td {
        vertical-align: middle;
        padding: 0;
      }

      span {
        cursor: pointer;
      }
    `,
  ],
})
export class ProductTableComponent {
  @ViewChild('modal') modal: ElementRef;
  items: Product[] = [];
  products: Product[];
  imgNotAvailable = environment.imgNotAvailable;
  // isArchivePage = false;
  productsState: 'disponibles' | 'vendus' | 'archivés';
  constructor(
    public productService: ProductService,
    private ngbModal: NgbModal,
    private toastService: ToastService,
    route: ActivatedRoute,
    private router: Router
  ) {
    const path = route.snapshot.url;
    if (path.length === 1) {
      this.productsState = 'disponibles';
      productService.getAvailableProducts().subscribe((products: Product[]) => {
        this.items = this.products = products.map((p) => new Product({ ...p }));
      });
    } else {
      switch (path[1].path) {
        case 'archives':
          this.productsState = 'archivés';
          productService
            .getArchivedProducts()
            .subscribe((products: Product[]) => {
              this.items = this.products = products.map(
                (p) => new Product({ ...p })
              );
            });
          break;
        case 'vendus':
          this.productsState = 'vendus';
          productService.getSoldProducts().subscribe((products: Product[]) => {
            this.items = this.products = products.map(
              (p) => new Product({ ...p })
            );
          });
          break;
        default:
          break;
      }
    }
  }

  openModal() {
    this.ngbModal.open(this.modal, {
      centered: true,
      size: 'md',
    });
  }

  filter(query: string) {
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

  goToPageProduct(id) {
    if (this.productsState == 'archivés') return;
    this.router.navigate([`/admin/bijoux/${id}`]);
  }

  makeExclusif(product: Product) {
    product.exclusif = !product.exclusif;
    this.productService.update(product);
  }

  async deleteProduct(product: Product) {
    if (product.status === 'réservé') {
      return this.openModal();
    }

    try {
      await this.productService.delete(product);
      this.toastService.show(
        'Suppression',
        `${product.title} a été supprimé avec succès !`
      );
    } catch (error) {
      this.toastService.show(
        'Suppression',
        `Un problème est survenu lors de la suppression de ${product.title} !`
      );
    }
  }

  async archiveProduct(product: Product) {
    if (product.status === 'réservé') {
      return this.openModal();
    }

    try {
      await this.productService.archive(product);
      this.toastService.show(
        'Archivage',
        `${product.title} a été archivé avec succès !`
      );
    } catch (error) {
      this.toastService.show(
        'Archivage',
        `Un problème est survenu lors de l'archivage de ${product.title} !`
      );
    }
  }

  async restoreProduct(product: Product) {
    try {
      await this.productService.restore(product);
      this.toastService.show(
        'Restauration',
        `${product.title} a été restauré avec succès !`
      );
    } catch (error) {
      this.toastService.show(
        'Restauration',
        `Un problème est survenu lors de la restauration de ${product.title} !`
      );
    }
  }

  async ArchiveOrRestore(product: Product) {
    if (this.productsState == 'archivés') await this.restoreProduct(product);
    else await this.archiveProduct(product);
  }
}
