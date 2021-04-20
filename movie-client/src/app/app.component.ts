import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'movie-client';
  toastSubscription: Subscription;
  user: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public notificationService: NotificationService,
    public snackBar: MatSnackBar
  ) { 
    this.authService.user.subscribe(x => this.user = x);
    // console.log(this.user)
    // if(localStorage.getItem("user")!=null){
    //   this.loggedIn = true
    // }
    this.toastSubscription = this.notificationService.toastInstance.subscribe(data => {
      this.openSnackBar(data.message);
    });
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, { 
      duration: 3000, 
    }); 
  }
}
