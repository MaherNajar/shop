import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/colors.service';
import { StoneService, Stone } from 'src/app/services/stones.service';

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
export class ProductFormComponent {
  uploadPercent: Observable<number>;
  subscription: Subscription;
  enteredStone: Stone;
  enteredColor: string;

  constructor(
    private router: Router,
    public ps: ProductService,
    private storage: AngularFireStorage,
    private toastService: ToastService,
    public authService: AuthService,
    public colorService: ColorService,
    public stoneService: StoneService
  ) {}

  addStone() {
    this.ps.product.stones.push(this.enteredStone.name);
    this.enteredStone = null;
  }

  removeStone(s: string) {
    this.ps.product.stones = this.ps.product.stones.filter((x) => x !== s);
  }

  addColor(k: string) {
    this.ps.product.colors.push(k);
  }

  removeColor(k: string) {
    this.ps.product.colors = this.ps.product.colors.filter((x) => x !== k);
  }

  save() {
    if (this.ps.product.id) this.ps.update(this.ps.product);
    else this.ps.create(this.ps.product);

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
    const iStart = this.ps.product.gallery.length;
    const remaining = 5 - iStart;

    if (files.length > remaining)
      throw new Error('Vous ne pouvez mettre plus de 5 photos par produit !');

    if (iStart === 0) this.ps.product.uploadRefDate = Date.now().toString();

    for (let i = iStart; i < iStart + files.length; i++) {
      const fileRef = this.storage.ref(
        `produits/${this.ps.product.uploadRefDate}-${i}`
      );

      const task = fileRef.put(files[i]);

      this.uploadPercent = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            this.ps.product.gallery.push(
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
          : this.stoneService.filteredStones
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  async onReturn() {
    if (!this.ps.product.id && this.ps.product.gallery.length > 0)
      this.ps.deleteImages(this.ps.product);
    this.router.navigate(['/admin/colliers']);
  }
}
