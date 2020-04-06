import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list("/categories", (ref) => {
        return ref.orderByChild("name");
      })
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c: any) => ({ key: c.key, ...c.payload.val() }))
        )
      );
  }
}
