import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { LocationService } from 'src/app/services/location.service';
import { take, map } from 'rxjs/operators';

@Component({
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private locService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService
      .get(id)
      .pipe(
        take(1),
        map((product) => {
          if (!product) this.router.navigate(['/bijoux']);
          else {
            this.product = new Product({ ...product, id });
          }
        })
      )
      .subscribe();
  }
}
