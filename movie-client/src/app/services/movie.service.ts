import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import {Movie} from '../model/movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  API_URL: string = environment.apiURL
  private token: string;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  constructor(private httpClient: HttpClient,public router: Router) { }

  movieList():Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.API_URL}/movie/list/`);
  }
}
