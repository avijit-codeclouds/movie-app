import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  loadCustomers(userId = null) : Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/customer`);
  }

  toggleLock(customerId, status): Observable<any> {
    return this.http.patch<any>(`${environment.apiURL}/customer/lock/${customerId}`, {
      lock: status
    });
  }

  deleteCustomer(customerId): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/customer/${customerId}`);
  }
}
