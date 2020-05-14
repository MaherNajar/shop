import { ShoppingCart } from './shopping-cart';
export class Order {
  id: string;
  datePlaced: number;
  items: any[];
  totalPrice: number;
  status: string = 'confirmée';

  constructor(
    public email: string,
    public message: string,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = Date.now();
    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map((x) => {
      return { ...x };
    });
  }
}
