import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService } from 'src/app/services/stones.service';
import { LocationService } from 'src/app/services/location.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styles: [
    `
      .selected {
        border: 1px groove lightgrey;
      }
      .notSelected {
        transition: opacity 0.1s;
        transition-property: opacity;
        transition-duration: 0.1s;
        transition-timing-function: ease;
        transition-delay: 0s;
        opacity: 0.6;
      }
    `,
  ],
})
export class ProductPreviewComponent implements OnInit {
  @Input('product') product: Product;
  @Input('canSetPic') canSetPic = false;
  email = '';
  message = '';
  username = '';
  user: User;
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
    private authService: AuthService,
    private contactService: ContactService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  get mainPicture() {
    return this.product.gallery[this.selectedPicture];
  }

  openModal(content) {
    this.ngbModal.open(content, {
      centered: true,
      size: 'lg',
    });
  }

  async sendMessage() {
    if (this.canSetPic) return;
    if (this.user) {
      this.username = this.user.displayName;
      this.email = this.user.email;
    }

    const { ip, loc } = await this.locService.location$.toPromise();
    const cartId = await this.cartService.getOrCreateCartId();

    const contact = new Contact(
      this.username,
      this.email,
      this.message,
      this.product.id,
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
      this.message = '';
    } catch (error) {
      this.toastService.show(
        'Echec',
        "Votre message n'a pas pu être envoyé, veuillez réessayer s'il vous plaît."
      );
    }
  }

  queryByParam(param) {
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
