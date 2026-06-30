import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { LocationService } from 'src/app/services/location.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { ToastService } from 'src/app/services/toast.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'product-preview',
    templateUrl: './product-preview.component.html',
    styles: [
        `
      .selected {
        border: 2px solid var(--color-gold, #c9a86a);
        opacity: 1;
      }
      .notSelected {
        transition: opacity 0.2s ease;
        opacity: 0.55;
      }
      .notSelected:hover {
        opacity: 1;
      }

      /* ---- Bloc d'informations produit ---- */
      .product-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .product-title {
        font-family: var(--font-serif, 'Cormorant Garamond', serif);
        font-size: 1.9rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--color-text, #2e2a26);
        margin-bottom: 0.5rem;
      }

      .product-title::after {
        content: '';
        display: block;
        width: 56px;
        height: 2px;
        margin: 0.6rem auto 0;
        background: linear-gradient(
          90deg,
          transparent,
          var(--color-gold, #c9a86a),
          transparent
        );
      }

      .stone-list {
        margin-bottom: 0.5rem;
      }

      .stone-list .StoneFilter {
        display: inline-block;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        padding: 0.2rem 0.7rem;
        border: 1px solid var(--color-border, #ece6dd);
        border-radius: 999px;
        background: #fff;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }

      .stone-list .StoneFilter:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm, 0 2px 10px rgba(46, 42, 38, 0.06));
      }

      .color-list {
        margin-bottom: 1rem;
      }

      .product-dim {
        font-size: 0.9rem;
        color: var(--color-muted, #8b8178);
      }

      /* ---- Bloc prix ---- */
      .price-block {
        background: var(--color-bg, #faf7f2);
        border: 1px solid var(--color-border, #ece6dd);
        border-radius: 14px;
        padding: 0.9rem 1rem;
        margin-bottom: 1.25rem;
      }

      .price-label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-size: 0.66rem;
        font-weight: 600;
        color: var(--color-muted, #8b8178);
        margin-bottom: 0.15rem;
      }

      .price-block .price {
        font-family: var(--font-serif, 'Cormorant Garamond', serif);
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--color-taupe, #8b7355);
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
    standalone: false
})
export class ProductPreviewComponent {
  @Input('product') product: Product;
  @Input('canSetPic') canSetPic = false;
  selectedPicture: number = 0;
  imgNotAvailable = environment.imgNotAvailable;

  constructor(
    public cartService: ShoppingCartService,
    private ngbModal: NgbModal,
    public productService: ProductService,
    public stoneService: StoneService,
    public colorService: ColorService,
    public locService: LocationService,
    private router: Router,
    private contactService: ContactService,
    private toastService: ToastService
  ) {}

  get mainPicture() {
    return this.product.gallery[this.selectedPicture];
  }

  openModal(content: unknown) {
    this.product.preloadMainImage(() => {
      this.ngbModal.open(content, {
        centered: true,
        size: 'lg',
      });
    });
  }

  async createContact({ username, email, message }) {
    if (this.canSetPic) return;

    const productId = this.product.id;
    const { ip, loc } = await firstValueFrom(this.locService.location$);
    const cartId = await this.cartService.getOrCreateCartId();

    const contact = new Contact(
      username,
      email,
      message,
      productId,
      cartId,
      ip,
      loc
    );

    try {
      await this.contactService.createContact(contact);
      this.toastService.show(
        'Message envoyé avec succès !',
        'Nous vous répondrons par email dans les plus brefs délais !'
      );
    } catch (error) {
      this.toastService.show(
        'Echec',
        "Votre message n'a pas pu être envoyé, veuillez réessayer s'il vous plaît."
      );
    }
  }

  queryByParam(param: Record<string, string>) {
    if (this.canSetPic) return;
    const key = Object.keys(param)[0];
    const value = param[key];
    this.router.navigate([`/bijoux/${key}/${value}`]);
  }

  setPic() {
    if (!this.canSetPic) return;
    let { gallery } = this.product;
    const mainPic = gallery[this.selectedPicture];
    gallery.splice(this.selectedPicture, 1);
    gallery.unshift(mainPic);
    this.product.gallery = gallery;
    this.selectedPicture = 0;
  }

  addToCart() {
    if (this.canSetPic) return;
    this.cartService.addToCart(this.product);
    this.router.navigate(['/panier']);
  }

  removeFromCart() {
    if (this.canSetPic) return;
    this.cartService.removeFromCart(this.product);
  }
}
