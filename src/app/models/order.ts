import { ShoppingCart } from './shopping-cart';
export class Order {
  id: string;
  datePlaced: number;
  items: any[];
  totalPrice: number;

  constructor(
    public email: string,
    public message: string,
    public status: string,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = Date.now();
    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          id: i.id,
          title: i.title,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
