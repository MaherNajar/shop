import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  user;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.authService.user$.subscribe((user) => (this.user = user));
    if (id === 'nouveau') this.productService.product = new Product();
    else this.productService.get(id);
  }
}
