import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  constructor(public cartService: ShoppingCartService) {}

  @Input('product')
  product: Product;
  @Input('show-actions')
  showActions = true;

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
