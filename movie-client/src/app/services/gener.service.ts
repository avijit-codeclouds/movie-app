import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import {Genere} from '../model/genere';
@Injectable({
  providedIn: 'root'
})
export class GenerService {
  API_URL: string = environment.apiURL
  private token: string;
  // private userSubject: BehaviorSubject<any>;
  // public user: Observable<any>;
  constructor(private httpClient: HttpClient,public router: Router) { 
   
  }
  generList():Observable<Genere[]>{
    return this.httpClient.get<Genere[]>(`${this.API_URL}/generes/`).pipe(retry(3), catchError(this.handleError));;
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
