import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'movie-client';

  user: any;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { 
    this.authService.user.subscribe(x => this.user = x);
    // console.log(this.user)
    // if(localStorage.getItem("user")!=null){
    //   this.loggedIn = true
    // }
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }
}
