import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  dateCreated;
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [itemId: string]: ShoppingCartItem }) {
    for (let itemId in itemsMap) {
      let item = itemsMap[itemId];
      if (item.quantity === 0) continue;
      this.items.push(new ShoppingCartItem({ ...item }));
    }
  }

  getQuantity(product: Product) {
    if (this.items.length === 0) return 0;
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
