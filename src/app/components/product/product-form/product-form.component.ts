import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/categories.service';

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
  percentage: number = 0;
  product: Product = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public catService: CategoryService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') this.product = new Product();
    else {
      productService.get(id).subscribe((p: Product) => {
        this.product = new Product({ ...p, id });
      });
    }
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
    this.productService.delete(this.product.id);
    this.router.navigate(['/admin/products']);
  }
}
