import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [
    `
      .img-container {
        background-color: #fff;
        box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24),
          0 0 2px rgba(10, 16, 20, 0.12);
        box-sizing: border-box;
        transition: box-shadow 0.3s;
        position: relative;
      }

      .img-container:hover {
        box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24),
          0 0 8px rgba(10, 16, 20, 0.12);
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  filteredProducts: Product[] = [];
  pierreParam: string;
  couleurParam: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: ShoppingCartService,
    public colorService: ColorService,
    public stoneService: StoneService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.getFilteredProducts();
  }

  private getFilteredProducts() {
    this.seo.generateTags({
      title: 'Arc en Perles',
      description:
        'Colliers en perles et pierres semi-précieuse de différentes variétés et couleurs',
      image:
        'https://firebasestorage.googleapis.com/v0/b/omyshop.appspot.com/o/produits%2F1589581696075-0_400x300?alt=media&token=df6ea8e9-9f23-456e-8b38-34a002ab38bb',
    });

    this.productService.getAllProducts().subscribe((products) => {
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
        } else this.filteredProducts = products;
      });
    });
  }
}
