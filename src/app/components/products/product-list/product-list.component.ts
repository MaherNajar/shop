import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { environment } from 'src/environments/environment';
import { map, tap, takeUntil } from 'rxjs/operators';
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

      /* ---- Hero page d'accueil ---- */
      .hero {
        position: relative;
        margin: -0.5rem 0 2.5rem;
        padding: clamp(3rem, 8vw, 5.5rem) 1.5rem;
        text-align: center;
        border-radius: 20px;
        overflow: hidden;
        background:
          radial-gradient(
            120% 120% at 50% 0%,
            #fffdf9 0%,
            #f5efe5 55%,
            #efe6d6 100%
          );
        box-shadow: var(--shadow-sm, 0 2px 10px rgba(46, 42, 38, 0.06));
      }

      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          rgba(201, 168, 106, 0.18) 1px,
          transparent 1px
        );
        background-size: 22px 22px;
        opacity: 0.6;
        pointer-events: none;
      }

      .hero-inner {
        position: relative;
        max-width: 640px;
        margin: 0 auto;
      }

      .hero-eyebrow {
        font-family: var(--font-sans, 'Inter', sans-serif);
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--color-gold-dark, #b8945a);
        margin-bottom: 0.75rem;
      }

      .hero-title {
        font-family: var(--font-serif, 'Cormorant Garamond', serif);
        font-weight: 600;
        font-size: clamp(3rem, 9vw, 5.5rem);
        line-height: 1.05;
        color: var(--color-taupe, #8b7355);
        margin: 0 0 0.75rem;
        letter-spacing: 1px;
      }

      .hero-subtitle {
        font-family: var(--font-sans, 'Inter', sans-serif);
        font-size: 1.05rem;
        color: var(--color-muted, #8b8178);
        max-width: 460px;
        margin: 0 auto 1.75rem;
        line-height: 1.65;
      }

      .hero-cta {
        padding: 0.7rem 2rem;
        font-size: 0.95rem;
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
        } else {
          switch (url[0].path) {
            case 'colliers':
              this.category = 'colliers';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.category === 'colliers');
              this.totalCount = this.filteredProducts.length;
              break;
            case 'bracelets-bagues-bo':
              this.category = 'bracelets-bagues-bo';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.category === 'bracelets_bagues_bo');
              this.totalCount = this.filteredProducts.length;
              break;
            case 'exclusifs':
              this.category = 'exclusifs';
              this.filteredProducts = products
                .map((x) => new Product({ ...x }))
                .filter((x) => x.exclusif);
              this.totalCount = this.filteredProducts.length;
              break;
            case 'pierre':
              this.route.params
                .pipe(
                  takeUntil(this.destroy$),
                  tap((params) => {
                    this.pierreParam = params.pierre;
                    this.category = 'pierre';
                    this.filteredProducts = products
                      .map((x) => new Product({ ...x }))
                      .filter((x) =>
                        x.stones?.some((s) => s === this.pierreParam),
                      );
                    this.totalCount = this.filteredProducts.length;
                  }),
                )
                .subscribe();
              break;
            case 'couleur':
              this.route.params
                .pipe(
                  takeUntil(this.destroy$),
                  tap((params) => {
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
                  }),
                )
                .subscribe();
              break;
          }
        }
      });
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}
