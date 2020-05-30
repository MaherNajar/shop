import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map, tap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService, Stone } from 'src/app/services/stones.service';
import { Product } from 'src/app/models/product';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [
    `
      #uploader {
        appearance: none;
        width: 100%;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class ProductFormComponent implements OnInit {
  product: Product;
  uploadPercent: Observable<number>;
  subscription: Subscription;
  enteredStone: Stone;
  enteredColor: string;
  constructor(
    private router: Router,
    public productService: ProductService,
    private storage: AngularFireStorage,
    private toastService: ToastService,
    public authService: AuthService,
    public colorService: ColorService,
    public stoneService: StoneService,
    private route: ActivatedRoute,
    private locService: LocationService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'nouveau') {
      this.product = new Product();
      return;
    } else {
      this.locService.location$
        .pipe(
          tap((location) => {
            this.productService
              .get(id)
              .pipe(
                take(1),
                map((product) => {
                  if (!product) this.router.navigate(['/colliers']);
                  else {
                    this.product = new Product(
                      { ...product, id },
                      location.isInTN
                    );
                  }
                })
              )
              .subscribe();
          })
        )
        .subscribe();
    }
  }

  addStone() {
    this.product.stones.push(this.enteredStone.name);
    this.enteredStone = null;
  }

  removeStone(s: string) {
    this.product.stones = this.product.stones.filter((x) => x !== s);
  }

  addColor(k: string) {
    this.product.colors.push(k);
  }

  removeColor(k: string) {
    this.product.colors = this.product.colors.filter((x) => x !== k);
  }

  save() {
    if (this.product.id) this.productService.update(this.product);
    else this.productService.create(this.product);

    this.router.navigate(['/admin/colliers']);
  }

  async imageUpload(e) {
    try {
      await this.upload(e.target.files);
    } catch (error) {
      this.toastService.show('Images upload', error.message);
    }
  }

  async upload(files) {
    const iStart = this.product.gallery.length;
    const remaining = 5 - iStart;

    if (files.length > remaining)
      throw new Error('Vous ne pouvez mettre plus de 5 photos par produit !');

    if (iStart === 0) this.product.uploadRefDate = Date.now().toString();

    for (let i = iStart; i < iStart + files.length; i++) {
      const fileRef = this.storage.ref(
        `produits/${this.product.uploadRefDate}-${i}`
      );

      const task = fileRef.put(files[i]);

      this.uploadPercent = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            this.product.gallery.push(
              await fileRef.getDownloadURL().toPromise()
            );
          })
        )
        .subscribe();
    }
  }

  formatter = (x: { name: string }) => x.name;

  searchStone = (text$: Observable<string>) =>
    text$.pipe(
      map((term) =>
        term === ''
          ? []
          : this.stoneService
              .getFilteredStones(this.product)
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  onReturn() {
    if (!this.product.id && this.product.gallery.length > 0)
      this.productService.deleteImages(this.product);
    this.router.navigate(['/admin/colliers']);
  }
}
