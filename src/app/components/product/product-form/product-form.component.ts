import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService, Category } from 'src/app/services/categories.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html',
  styles: [
    `
      #uploader {
        appearance: none;
        width: 100%;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class ProductFormComponent implements OnInit {
  uploadPercent: Observable<number>;
  product: Product = null;
  categories$: Observable<Category[]>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public catService: CategoryService,
    private storage: AngularFireStorage,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id === 'nouveau') this.product = new Product();
    else {
      this.productService
        .get(id)
        .subscribe(
          (product: Product) => (this.product = new Product({ ...product, id }))
        );
    }
    this.categories$ = this.catService.getCategories();
  }

  save() {
    if (this.product.id) this.productService.update(this.product);
    else this.productService.create(this.product);

    this.router.navigate(['/admin/produits']);
  }

  async imageUpload(e) {
    try {
      const { date: imageRefDate, urls } = await this.getUrls(e.target.files);
      this.product = { ...this.product, imageRefDate, images: urls };
    } catch (error) {
      this.toastService.show('Images upload', error.message);
    }
  }

  async getUrls(files) {
    const date = Date.now().toString();
    let urls = [];

    for (let i = 0; i < files.length; i++) {
      const fileRef = this.storage.ref(`produits/${date}-${i}`);

      const task = fileRef.put(files[i]);

      this.uploadPercent = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            urls.push(await fileRef.getDownloadURL().toPromise());
          })
        )
        .subscribe();
    }

    return { urls, date };
  }

  async onReturn() {
    if (!this.product.id && this.product.images.length > 0)
      this.productService.deleteImages(this.product);
    this.router.navigate(['/admin/produits']);
  }
}
