import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styles: [
    `
      .alert {
        width: 100%;
        text-align: center;
      }
    `,
  ],
})
export class ProductsComponent implements OnInit {
  tag: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAllProducts()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.tag = params.get('tag');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.tag
      ? this.products.filter((p) => p.hasTagKey(this.tag))
      : this.products;
  }
}
