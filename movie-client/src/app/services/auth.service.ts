import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, retry, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = environment.apiURL
  private token: string;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private rawUser: any = null;
  private rawUserSubject: Subject<any> = new Subject<any>();


  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private cookieService: CookieService
  ) { 
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  registerUser(user: any) : Observable<any> {
    return this.httpClient.post(`${this.API_URL}/users/register`, user)
    .pipe(retry(3), catchError(this.handleError)); 
  }

  login(user: any): Observable<any> {
    // return this.request("post", "login", user);
    return this.httpClient.post(`${this.API_URL}/users/login`, user)
    .pipe(retry(3), catchError(this.handleError));
  }

  genreAdd(data : any) : Observable<any> {
    return this.httpClient.post(`${this.API_URL}/generes/add`, data)
    .pipe(retry(3), catchError(this.handleError));
  }

  public get currentUserValue(): any {
    return this.userSubject.value;
  }

  logout(queryParams={}): void {
    this.token = "";
    // window.localStorage.removeItem("mean-token");

    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    this.cookieService.delete('movie-page');
    this.cookieService.delete('movie-selected-genre');
    this.cookieService.delete('movie-current-sort');
    this.userSubject.next(null);
    this.router.navigate(['/login'], queryParams);
    this.rawUser = null;
  }

  saveToken(token: string): void {
    // localStorage.setItem("mean-token", token);
    this.token = token;
    localStorage.setItem('user', JSON.stringify(token));
    this.userSubject.next(token);
  }

  currentUser(id){
    localStorage.setItem('user_id',id);
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error)
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  loadCurrentUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/users/me`).pipe(
      tap(r => {
        if (r.success) {
          this.rawUser = r.result;
          this.rawUserSubject.next(this.rawUser);
        }
      })
    )
  }

  get me() {
    return this.rawUser;
  }

  get isAdmin(): boolean {
    if (this.rawUser!=null && this.rawUser.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  get isUser(): boolean {
    if (this.rawUser!=null && this.rawUser.role == 'user') {
      return true;
    } else {
      return false;
    }
  }

  get isAuth(): boolean {
    return this.rawUser != null;
  }

  get rawUserSubjectInstance(): Observable<any> {
    return this.rawUserSubject.asObservable();
  }
}
