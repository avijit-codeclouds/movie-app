import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  token:boolean;
  movies:[];
  constructor(private movieservice:MovieService) { }

  ngOnInit() {
    if (localStorage.getItem("user") === null) {
     this.token=true;
    }
    else{
      console.log('Unauthorized');
    }
    this.getMovies()
  }

  getMovies(){
    console.log('movie list');
    this.movieservice.movieList().subscribe((data)=>{
      this.movies=data['result']
      // console.log(data['result']);
    })
  }

}


