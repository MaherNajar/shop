export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  author: string;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
