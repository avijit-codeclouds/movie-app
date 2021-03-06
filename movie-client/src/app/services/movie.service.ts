import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { Movie } from '../model/movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  API_URL: string = environment.apiURL
  private token: string;
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  constructor(private httpClient: HttpClient,public router: Router) { }

  movieList(sortBy: string = "createdAt"):Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.API_URL}/movie`, {params: {
      sort: sortBy,}
    },).pipe(retry(3), catchError(this.handleError));;
  }

  genreList() : Observable<any> {
    return this.httpClient.get(`${this.API_URL}/generes`)
    .pipe(retry(3), catchError(this.handleError));
  }

  addMovie(payload: any) : Observable<any> {
    return this.httpClient.post(`${this.API_URL}/movie`, payload)
    .pipe(retry(3), catchError(this.handleError)); 
  }

  updateMovie(payload: any,movie_id: string) : Observable<any> {
    return this.httpClient.patch(`${this.API_URL}/movie/`+movie_id, payload)
    .pipe(retry(3), catchError(this.handleError)); 
  }

  getSingleMovie(movie_id: string) : Observable<any> {
    return this.httpClient.get(`${this.API_URL}/movie/`+movie_id)
    .pipe(retry(3), catchError(this.handleError));
  }
  deleteMovie(movie_id: string):Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/movie/`+movie_id)
    .pipe(retry(3), catchError(this.handleError));
  }
  movieWishlist(data:any) : Observable<any> {
    return this.httpClient.post(`${this.API_URL}/wishlist`,data)
    .pipe(retry(3), catchError(this.handleError));
  }

  rentMovies(data:any) : Observable<any> {
    return this.httpClient.post(`${this.API_URL}/rent`,data)
    .pipe(retry(3), catchError(this.handleError));
  }

  singleUserRentMovies(data:any,user_id: any) : Observable<any> {
    return this.httpClient.get(`${this.API_URL}/rent/`+user_id,data)
    .pipe(retry(3), catchError(this.handleError));
  }

  fetchData(data:any){
    let promise = new Promise((resolve, reject) => {
      this.httpClient.post(`${this.API_URL}/wishlist`,data)
      .pipe(retry(3),catchError(this.handleError))
      .toPromise()
          .then(
              res => { // Success
                // this.results = res.json().results;
                resolve(res);
              },
              msg => { // Error
                reject(msg);
              }
          );
    })
    return promise;
  }

  
  getMovieWishlist() : Observable<any> {
    return this.httpClient.get(`${this.API_URL}/wishlist/`)
    .pipe(retry(3), catchError(this.handleError));
  }

  deleteMovieWishlist(movie_id: string):Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/wishlist/`+movie_id)
    .pipe(retry(3), catchError(this.handleError));
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
    return throwError(error);
  }

  restoreMovie(movieId): Observable<any> {
    return this.httpClient.patch<any>(`${this.API_URL}/movie/restore/`+movieId, {});
  }
}
