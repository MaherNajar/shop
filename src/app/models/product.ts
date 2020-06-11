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
  favorite: boolean = false;
  exclusif: boolean = false;

  constructor(init?: Partial<Product>, private isInTN: boolean = false) {
    Object.assign(this, init);
  }

  get Price() {
    return this.isInTN ? this.price : +(this.price * 0.7).toFixed(2);
  }
}
