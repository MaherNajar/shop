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
      const { gallery, uploadRefDate } = await this.getGallery(e.target.files);

      this.product.gallery.push(...gallery);

      if (!this.product.uploadRefDate)
        this.product.uploadRefDate = uploadRefDate;
    } catch (error) {
      this.toastService.show('Images upload', error.message);
    }
  }

  async getGallery(files) {
    const uploadRefDate = Date.now().toString();
    let gallery: string[] = [];
    const iStart = this.product.gallery.length;
    const imageCount = 5 - iStart - files.length;

    if (imageCount < 0)
      throw new Error('Vous ne pouvez mettre plus de 5 photos !');

    for (let i = iStart; i < iStart + files.length; i++) {
      const fileRef = this.storage.ref(`produits/${uploadRefDate}-${i}`);

      const task = fileRef.put(files[i]);

      this.uploadPercent = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            gallery.push(await fileRef.getDownloadURL().toPromise());
          })
        )
        .subscribe();
    }
    return { gallery, uploadRefDate };
  }

  async onReturn() {
    if (!this.product.id && this.product.gallery.length > 0)
      this.productService.deleteImages(this.product);
    this.router.navigate(['/admin/produits']);
  }
}
