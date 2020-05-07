import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
})
export class ProductQuantityComponent {
  constructor(public cartService: ShoppingCartService) {}

  @Input('product')
  product: Product;

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    if (this.cartService.cart.getItemQuantity(this.product.id) === 0) return;
    this.cartService.removeFromCart(this.product);
  }
}
