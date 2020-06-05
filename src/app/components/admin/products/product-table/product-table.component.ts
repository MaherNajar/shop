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
      table {
        width: 100%;
      }

      th.mat-sort-header-sorted {
        color: black;
      }

      .delete,
      .archiveOrRestore {
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
  isArchivePage = false;
  constructor(
    public productService: ProductService,
    private ngbModal: NgbModal,
    private toastService: ToastService,
    route: ActivatedRoute,
    private router: Router
  ) {
    const path = route.snapshot.url;
    if (path.length === 1) {
      productService.getAllProducts().subscribe((products: Product[]) => {
        this.items = this.products = products;
      });
    } else {
      this.isArchivePage = true;
      productService.getArchivedProducts().subscribe((products: Product[]) => {
        this.items = this.products = products;
      });
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
    if (this.isArchivePage) return;
    this.router.navigate([`/admin/colliers/${id}`]);
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
    if (this.isArchivePage) await this.restoreProduct(product);
    else await this.archiveProduct(product);
  }
}
