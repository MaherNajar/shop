import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { User } from "src/models/user";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((appUser: User) => {
        if (appUser) return appUser.isAdmin;
        return false;
      })
    );
  }
}
