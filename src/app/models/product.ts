export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  uid: string;
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
