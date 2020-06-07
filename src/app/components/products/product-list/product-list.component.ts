import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  filteredProducts: Product[] = [];
  pierreParam: string;
  couleurParam: string;
  category: string;
  imgNotAvailable = environment.imgNotAvailable;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: ShoppingCartService,
    public colorService: ColorService,
    public stoneService: StoneService
  ) {}

  ngOnInit() {
    this.getFilteredProducts();
  }

  private getFilteredProducts() {
    const { url } = this.route.snapshot;
    this.productService.getAllProducts().subscribe((products) => {
      if (url.length === 0) {
        this.category = '';
        this.route.queryParamMap.subscribe((params) => {
          this.pierreParam = params.get('pierre');
          this.couleurParam = params.get('couleur');

          if (this.pierreParam) {
            this.filteredProducts = products.filter((x) =>
              x.stones?.some((s) => s === this.pierreParam)
            );
          } else if (this.couleurParam) {
            this.filteredProducts = products.filter((x) =>
              x.colors?.some(
                (c) =>
                  this.colorService.getColorObject(c).name === this.couleurParam
              )
            );
          } else {
            this.category = 'bestOf';
            this.filteredProducts = products.filter((x) => x.favorite);
          }
        });
      } else if (url[0].path === 'colliers') {
        this.category = 'colliers';
        this.filteredProducts = products.filter(
          (x) => x.category === 'colliers'
        );
      } else {
        this.category = 'bracelets-bagues-bo';
        this.filteredProducts = products.filter(
          (x) => x.category === 'bracelets_bagues_bo'
        );
      }
    });
  }
}
