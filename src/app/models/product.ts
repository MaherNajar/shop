export class Product {
  id: string = '';
  title: string = '';
  price: number = 0;
  priceEU: number = 0;
  weight: number = 0;
  colors: string[] = [];
  stones: string[] = [];
  gallery: string[] = [];
  uploadRefDate: string = '';
  uid: string = '';
  category: 'colliers' | 'bracelets_bagues_bo' = 'colliers';
  status: 'disponible' | 'réservé' | 'vendu' = 'disponible';
  exclusif: boolean = false;
  dateCreation: string = '';
  loaded: boolean = false;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
    this.preloadImage();
  }

  get foreignPrice() {
    if (this.priceEU !== 0) return this.priceEU;
    return Math.round((this.price / 3.2) * 1.1);
  }

  get isAvailable() {
    return this.status != 'vendu';
  }

  preloadImage() {
    let preload = new Image();

    preload.onload = () => {
      this.loaded = true;
    };

    let src = this.gallery[0];
    if (!src) return;
    let url = src.split('?');
    url.splice(1, 0, '_400x300?');
    preload.src = url.join('');
  }

  preloadMainImage(callback) {
    this.loaded = false;

    let preload = new Image();

    preload.onload = () => {
      this.loaded = true;
      callback();
    };

    preload.src = this.gallery[0];
  }
}
