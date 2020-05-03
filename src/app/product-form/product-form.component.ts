import { ProductService } from '../../services/product.service';
import { Categories, Category } from '../../services/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Product } from '../../models/product';
import * as firebase from 'firebase/app';
import 'firebase/storage';

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
export class ProductFormComponent {
  categories: Category[];
  percentage: number = 0;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.categories = Categories;

    let id = this.route.snapshot.paramMap.get('id');

    if (id)
      productService.get(id).subscribe((p: Product) => {
        this.product = { ...p, id };
      });
  }

  save() {
    if (this.product.id) this.productService.update(this.product);
    else this.productService.create(this.product);

    this.router.navigate(['/admin/products']);
  }

  imageUpload(e) {
    const file = e.target.files[0];
    const storage = firebase.storage();
    const storageRef = storage.ref('images/' + file.name);

    let task = storageRef.put(file);

    task.on(
      'state_changed',
      (snapshot) => {
        this.percentage =
          (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
      },
      (err) => {},
      () => {
        storageRef
          .getDownloadURL()
          .then((url) => (this.product.imageUrl = url));
      }
    );
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product ?')) return;

    // this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
