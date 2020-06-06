export class Product {
  id: string = '';
  title: string = '';
  price: number = 0;
  colors: string[] = [];
  stones: string[] = [];
  gallery: string[] = [];
  uploadRefDate: string = '';
  uid: string = '';
  category: 'colliers' | 'bracelets_bagues_bo' = 'colliers';
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';

  constructor(init?: Partial<Product>, private isInTN: boolean = false) {
    Object.assign(this, init);
  }

  get Price() {
    return this.isInTN ? this.price : +(this.price / 3.17).toFixed(2);
  }
}
