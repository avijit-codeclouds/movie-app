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

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|boolean {
      if (this.authService.isAuth) {
        return true;
      } else {
        return this.authService.loadCurrentUser().pipe(map(r => {
          return true;
        }), catchError(r => {
          this.notificationService.toast('Session Expired. Please login again..');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return of(false);
        }));
      }
  }
  
}
