import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private ps: ProductService) {}
  get allColors() {
    return Colors;
  }
  get filteredColors() {
    return Colors.filter((x) =>
      this.ps.product.colors.every((c) => c !== x.key)
    );
  }

  getColorObject(c) {
    return Colors.find((x) => x.key === c);
  }
}

export interface Color {
  key: string;
  name: string;
}

const Colors: Color[] = [
  { key: '10019', name: 'Noir' },
  { key: '10020', name: 'Bleu' },
  { key: '10021', name: 'Brun' },
  { key: '10022', name: 'Clair' },
  { key: '10023', name: 'Cyan' },
  { key: '10024', name: 'Or' },
  { key: '10025', name: 'Gris' },
  { key: '10026', name: 'Vert' },
  { key: '10027', name: 'Ivoire' },
  { key: '10028', name: 'Multicolore' },
  { key: '10029', name: 'Orange' },
  { key: '10030', name: 'Rose' },
  { key: '10031', name: 'Rouge' },
  { key: '10032', name: 'Argent' },
  { key: '10033', name: 'Pourpre' },
  { key: '10034', name: 'Blanc' },
  { key: '10035', name: 'Jaune' },
];
