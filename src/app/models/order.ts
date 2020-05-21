import { ShoppingCart } from './shopping-cart';
import { Visitor } from './customer';
export class Order {
  id: string;
  datePlaced: number;
  items: any[];
  totalPrice: number;
  status: string = 'confirmée';

  constructor(public customer: Visitor, shoppingCart: ShoppingCart) {
    this.datePlaced = Date.now();
    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map((x) => {
      return { ...x };
    });
  }
}
