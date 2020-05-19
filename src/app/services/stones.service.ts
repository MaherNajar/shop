import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

export interface Stone {
  cssColor: string;
  name: string;
}

const Stones: Stone[] = [
  { name: 'Agate', cssColor: 'grey' },
  { name: 'Améthyste', cssColor: 'purple' },
  { name: 'Aigue-marine', cssColor: 'lightskyblue' },
  { name: 'Aventurine', cssColor: 'lightseagreen' },
  { name: 'Quartz', cssColor: 'brown' },
  { name: 'Chrysoprase', cssColor: 'green' },
  { name: 'Ruby Zoisite', cssColor: '#609' },
  { name: 'Cristal', cssColor: 'wheat' },
];

@Injectable({
  providedIn: 'root',
})
export class StoneService {
  constructor(private ps: ProductService) {}
  getStoneObject(name: string) {
    return Stones.find((s) => s.name === name);
  }
  get allStones() {
    return Stones;
  }
  get filteredStones() {
    const stones = Stones.filter((s) =>
      this.ps.product.stones.every((x) => x !== s.name)
    );
    return stones;
  }
}
