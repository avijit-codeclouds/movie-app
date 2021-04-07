import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = environment.apiURL
  private token: string;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private httpClient: HttpClient,public router: Router) { 
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

  logout(): void {
    this.token = "";
    // window.localStorage.removeItem("mean-token");

    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  saveToken(token: string): void {
    // localStorage.setItem("mean-token", token);
    this.token = token;
    localStorage.setItem('user', JSON.stringify(token));
    this.userSubject.next(token);
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
}
