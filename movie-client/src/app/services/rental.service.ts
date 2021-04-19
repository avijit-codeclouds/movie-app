import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  rentals(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/rent`);
  }

  userMovies(userId): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/rent/${userId}`);
  }

  rentActions(userId, movieId, actionType, actionValue): Observable<any> {
    return this.http.patch(`${environment.apiURL}/rent/action`, {
      'user': userId,
      'movie': movieId,
      'action': actionType,
      'action_value': actionValue,
    });
  }
}
