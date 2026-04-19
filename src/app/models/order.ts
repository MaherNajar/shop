import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
  id: string = '';
  datePlaced: number;
  items: ShoppingCartItem[];
  totalPrice: number;
  status: 'confirmée' | 'en cours' | 'livrée' | 'annulée' = 'confirmée';

  constructor(
    public username: string,
    public email: string,
    public message: string,
    public ip: string,
    public loc: string,
    shoppingCart: ShoppingCart,
  ) {
    this.datePlaced = Date.now();
    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map((x) => {
      return { ...x };
    });
  }
}
