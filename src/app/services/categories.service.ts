import { Injectable } from '@angular/core';

export interface Category {
  key: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private Categories: Category[] = [
    { key: 'assaisonnements', name: 'Épices' },
    { key: 'fruits', name: 'Fruits' },
    { key: 'laitages', name: 'Laitages' },
    { key: 'légumes', name: 'Légumes' },
    { key: 'pain', name: 'Pains' },
  ];

  getCategories() {
    return this.Categories;
  }
}
