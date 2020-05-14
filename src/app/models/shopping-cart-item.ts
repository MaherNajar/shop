export class ShoppingCartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  mainPicture: string;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
