import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Title } from '@angular/platform-browser';

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
    public snackBar: MatSnackBar,
    public activatedroute: ActivatedRoute,
    private titleService: Title
  ) { 
    this.authService.user.subscribe(x => this.user = x);
    // console.log(this.user)
    // if(localStorage.getItem("user")!=null){
    //   this.loggedIn = true
    // }
    this.toastSubscription = this.notificationService.toastInstance.subscribe(data => {
      this.openSnackBar(data.message);
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let title = this.activatedroute.snapshot.firstChild.data.title;
        this.titleService.setTitle(title);
      }
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
