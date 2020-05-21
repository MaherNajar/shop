import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  pierreParam: string;
  couleurParam: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: ShoppingCartService,
    public colorService: ColorService,
    public stoneService: StoneService
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
        this.pierreParam = params.get('pierre');
        this.couleurParam = params.get('couleur');

        if (this.pierreParam) {
          this.filteredProducts = this.products.filter((x) =>
            x.stones?.some((s) => s === this.pierreParam)
          );
        } else if (this.couleurParam) {
          this.filteredProducts = this.products.filter((x) =>
            x.colors?.some(
              (c) =>
                this.colorService.getColorObject(c).name === this.couleurParam
            )
          );
        } else this.filteredProducts = this.products;
      });
  }
}
