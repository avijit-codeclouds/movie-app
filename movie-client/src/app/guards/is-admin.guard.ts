import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from './../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.me().pipe(map((data) => {
      if (data && data.success && data.result.role == 'admin') {
        return true;
      } else {
        return false;
      }
    }));
  }
  
}
