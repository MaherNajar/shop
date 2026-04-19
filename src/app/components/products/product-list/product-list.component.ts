import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { environment } from 'src/environments/environment';
import { map, takeUntil } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [
    `
      a:hover {
        text-decoration: none;
      }

      .prod-container {
        position: relative;
        text-align: center;
      }

      .top-right {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    `,
  ],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(350, style({ opacity: 1 })),
      ]),
    ]),
  ],
  standalone: false,
})
export class ProductListComponent implements OnInit, OnDestroy {
  user: User;
  filteredProducts: Product[] = [];
  category: string = '';
  couleurParam: string = '';
  pierreParam: string = '';
  totalCount: number = 0;
  imgNotAvailable: string = environment.imgNotAvailable;

  items: Product[] = [];
  step: number = 12;
  position = 0;
  canLoadMore = true;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: ShoppingCartService,
    public colorService: ColorService,
    public stoneService: StoneService,
    public locationService: LocationService,
    public authService: AuthService,
  ) {
    authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.getFilteredProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getFilteredProducts() {
    const { url } = this.route.snapshot;
    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        if (url.length === 0) {
          this.category = 'all';
          this.filteredProducts = products.map((x) => new Product({ ...x }));
          this.totalCount = this.filteredProducts.length;
          // this.getItems();
        } else {
          switch (url[0].path) {
            case 'colliers':
              this.category = 'colliers';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.category === 'colliers');
              this.totalCount = this.filteredProducts.length;
              // this.getItems();
              break;
            case 'bracelets-bagues-bo':
              this.category = 'bracelets-bagues-bo';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.category === 'bracelets_bagues_bo');
              this.totalCount = this.filteredProducts.length;
              // this.getItems();
              break;
            case 'exclusifs':
              this.category = 'exclusifs';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.exclusif);
              this.totalCount = this.filteredProducts.length;
              // this.getItems();
              break;
            case 'pierre':
              this.route.params
                .pipe(
                  takeUntil(this.destroy$),
                  map((params) => {
                    // this.reset();
                    this.pierreParam = params.pierre;
                    this.category = 'pierre';
                    this.filteredProducts = products
                      .map((x) => new Product({ ...x }))
                      .filter((x) =>
                        x.stones?.some((s) => s === this.pierreParam),
                      );
                    this.totalCount = this.filteredProducts.length;
                    // this.getItems();
                  }),
                )
                .subscribe();
              break;
            case 'couleur':
              this.route.params
                .pipe(
                  takeUntil(this.destroy$),
                  map((params) => {
                    // this.reset();
                    this.couleurParam = params.couleur;
                    this.category = 'couleur';
                    this.filteredProducts = products
                      .map((x) => new Product({ ...x }))
                      .filter((x) =>
                        x.colors?.some(
                          (c) =>
                            this.colorService.getColorObject(c).name ===
                            this.couleurParam,
                        ),
                      );
                    this.totalCount = this.filteredProducts.length;
                    // this.getItems();
                  }),
                )
                .subscribe();
              break;
          }
        }
      });
  }

  // private reset() {
  //   this.canLoadMore = true;
  //   this.filteredProducts = [];
  //   this.items = [];
  //   this.position = 0;
  // }

  // getItems() {
  //   if (this.position === this.totalCount) {
  //     this.canLoadMore = false;
  //     return;
  //   }

  //   let nextPosition = this.position + this.step;

  //   if (nextPosition > this.totalCount) {
  //     nextPosition = this.totalCount;
  //     this.canLoadMore = false;
  //   }

  //   let tmp = [...this.filteredProducts];
  //   let nextPhotos = tmp.slice(this.position, nextPosition);
  //   this.items.push(...nextPhotos);
  //   this.position = nextPosition;
  // }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}
