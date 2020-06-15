export class Product {
  id: string = '';
  title: string = '';
  price: number = 0;
  priceEU: number = 0;
  colors: string[] = [];
  stones: string[] = [];
  gallery: string[] = [];
  uploadRefDate: string = '';
  uid: string = '';
  category: 'colliers' | 'bracelets_bagues_bo' = 'colliers';
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';
  exclusif: boolean = false;
  dateCreation: string = '';

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
