import { ShoppingCart } from "./shopping-cart";
export class Order {
  datePlaced: number;
  items: any[];
  totalPrice: number;

  constructor(
    public userId: string,
    public shipping,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = Date.now();
    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
