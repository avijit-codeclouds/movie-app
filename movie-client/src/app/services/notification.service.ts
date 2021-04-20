import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toastSubject: Subject<any> = new Subject<any>();

  constructor() { }

  get toastInstance(): Observable<any> {
    return this.toastSubject.asObservable();
  }

  toast(message: string): void {
    this.toastSubject.next({
      message: message,
    });
  }
}
