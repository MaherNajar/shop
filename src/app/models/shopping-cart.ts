import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(itemsMap: { [itemId: string]: ShoppingCartItem }) {
    if (itemsMap) {
      for (const itemId in itemsMap) {
        if (itemsMap.hasOwnProperty(itemId)) {
          const item = itemsMap[itemId];
          if (item.quantity !== 0) {
            this.items.push(new ShoppingCartItem({ ...item }));
          }
        }
      }
    }
  }

  get cartIsEmpty(): boolean {
    return this.items.length === 0;
  }

  get totalPrice(): number {
    if (this.cartIsEmpty) return 0;
    return this.items.map((item) => item.totalPrice).reduce((a, b) => a + b);
  }

  get totalItemsCount(): number {
    if (this.cartIsEmpty) return 0;
    return this.items.map((item) => item.quantity).reduce((a, b) => a + b);
  }

  getItemQuantity(id: string): number {
    if (this.cartIsEmpty) return 0;
    const item = this.items.find((x) => x.id === id);
    return item ? item.quantity : 0;
  }
}
