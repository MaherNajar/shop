export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  gallery: string[] = [];
  uploadRefDate: string;
  uid: string;
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
