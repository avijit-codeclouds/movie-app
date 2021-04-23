import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { AuthService } from "../services/auth.service";
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService, 
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            if (!err.url.endsWith('/users/me')) {
                this.notificationService.toast('Session Expired. Please login again..');
            }
            let url = this.router.routerState.snapshot.url || '/';
            if (url.startsWith('/login')) {
                url = this.route.snapshot.queryParams.returnUrl || '/'
            }
            this.authenticationService.logout({ queryParams: { returnUrl: url }})
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) { 
            const token = localStorage.getItem('user').slice(1, -1)
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer'+' '+token
                }
            });
        }

        return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));;
    }
}