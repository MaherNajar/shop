import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { SeoService } from 'src/app/services/seo.service';
import { LocationService } from 'src/app/services/location.service';
import { tap } from 'rxjs/operators';

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
    private seo: SeoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.locService.location$
      .pipe(
        tap((location) => {
          this.productService
            .get(id)
            .pipe(
              tap((product: Product) => {
                this.seo.generateTags({
                  title: product.title,
                  description: `${product.stones?.join()} ${product.Price?.toString()} ${
                    location.displayCurrency
                  }`,
                  image: product.gallery[0],
                });
                this.product = new Product({ ...product, id }, location.isInTN);
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
