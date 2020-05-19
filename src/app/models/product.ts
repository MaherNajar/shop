export class Product {
  id: string;
  title: string;
  price: number;
  colors: string[] = [];
  stones: string[] = [];
  gallery: string[] = [];
  uploadRefDate: string;
  uid: string;
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
