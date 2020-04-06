import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products" + productId).remove();
  }

  getAll() {
    return this.db
      .list("/products")
      .snapshotChanges()
      .pipe(
        map((products) =>
          products.map((p: any) => ({ key: p.key, ...p.payload.val() }))
        )
      );
  }

  get(productId) {
    return this.db.object("/products/" + productId).valueChanges();
  }
}
