import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|boolean {
      if (this.authService.isAuth) {
        return true;
      } else {
        return this.authService.loadCurrentUser().pipe(map(r => {
          return true;
        }), catchError(r => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return of(false);
        }));
      }
  }
  
}
