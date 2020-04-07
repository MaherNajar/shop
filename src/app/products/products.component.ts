import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../models/shopping-cart';

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
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.populateProducts();
    this.cart$ = this.cartService.getCart();
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
