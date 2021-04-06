import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  token:any;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("user") === null) {
     this.token='token';
    }
    else{
      console.log('Unauthorized');
    }
  }

}
