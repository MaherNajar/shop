import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(itemsMap: { [itemId: string]: ShoppingCartItem }) {
    for (let itemId in itemsMap) {
      let item = itemsMap[itemId];
      if (item.quantity === 0) continue;
      this.items.push(new ShoppingCartItem({ ...item }));
    }
  }

  get cartIsEmpty() {
    return this.items.length === 0;
  }

  get totalPrice() {
    if (this.cartIsEmpty) return 0;
    return this.items.map((item) => item.totalPrice).reduce((a, b) => a + b);
  }

  get totalItemsCount() {
    if (this.cartIsEmpty) return 0;
    return this.items.map((item) => item.quantity).reduce((a, b) => a + b);
  }

  getItemQuantity(id) {
    if (this.cartIsEmpty) return 0;
    let item = this.items.find((x) => x.id == id);
    return item ? item.quantity : 0;
  }
}
