import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  buttonSubject: Subject<Array<any>> = new Subject<Array<any>>();
  clickSubject: Subject<{type: string, data: any}> = new Subject<{type: string, data: object}>();
  
  constructor() { }

  buttonSubjectInstance() {
    return this.buttonSubject.asObservable();
  }

  updateButtonSubject(config: Array<any>) {
    this.buttonSubject.next(config);
  }

  onClick() {
    return this.clickSubject.asObservable();
  }

  sendClick(type: string, data: any) {
    this.clickSubject.next({type: type, data: data});
  }

}
