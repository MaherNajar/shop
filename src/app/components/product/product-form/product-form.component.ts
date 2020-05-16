import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, debounceTime, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Tag, TagService } from 'src/app/services/tag.service';
import { ToastService } from 'src/app/services/toast.service';

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
  uploadPercent: Observable<number>;
  subscription: Subscription;
  tags: Tag[];
  filteredTags: Tag[] = [];
  tag: Tag;
  formatter = (x: { name: string }) => x.name;

  constructor(
    private router: Router,
    public ps: ProductService,
    public tagService: TagService,
    private storage: AngularFireStorage,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.tags = this.tagService.getTags();
    this.filteredTags = this.tags.filter((x) =>
      this.ps.product.hasTagKey(x.key)
    );
  }

  addTag() {
    if (this.ps.product.hasTagKey(this.tag.key)) {
      this.tag = null;
      return;
    }
    this.ps.product.tags.push(this.tag.key);
    this.filteredTags = this.tags.filter((x) =>
      this.ps.product.hasTagKey(x.key)
    );
    this.tag = null;
  }
  save() {
    if (this.ps.product.id) this.ps.update(this.ps.product);
    else this.ps.create(this.ps.product);

    this.router.navigate(['/produits']);
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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.tags
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  async onReturn() {
    if (!this.ps.product.id && this.ps.product.gallery.length > 0)
      this.ps.deleteImages(this.ps.product);
    this.router.navigate(['/admin/produits']);
  }
}
