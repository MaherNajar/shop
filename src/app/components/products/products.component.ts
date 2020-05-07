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
  category: string;
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
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          // const list = this.products.map(p => p.imageUrl.replace("-min", ""));
          // const storage = firebase.storage();
          // list.forEach(e => {
          //   const storageRef = storage.refFromURL(e);
          //   storageRef.delete();
          // });
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
