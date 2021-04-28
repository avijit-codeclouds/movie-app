import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviews(movieId): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/reviews/${movieId}`);
  }

  saveReviews(movieId, data): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/reviews/${movieId}`, data);
  }
}
