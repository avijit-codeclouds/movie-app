import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {GenerService} from '../services/gener.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  token:boolean;
  movies:[];
  generes:[];
  query;
  p;
  storeMovies : []

  constructor(public movieservice:MovieService , public genereservice:GenerService) { }

  ngOnInit() {
    if (localStorage.getItem("user") === null) {
     this.token=true;
    }
    else{
      
      console.log('Unauthorized');
    }
    this.getGenere();
    this.getMovies()
  }

  getGenre(genreType){
    if(genreType == 'all'){
      this.movies = this.storeMovies
    }else{
      this.p = 1;
      this.movies = this.filterData(genreType,this.storeMovies)
    }
  }

  filterData(type,movieList) {
    return movieList.filter(object => {
      return object['genre']['name'] == type;
    });
  }

  getMovies(){
    this.movieservice.movieList().subscribe((data)=>{
      this.movies=data['result']
      this.storeMovies = this.movies
      // console.log(data['result']);
    })
  }
  getGenere(){
    this.genereservice.generList().subscribe((data)=>{
      this.generes=data['genere']
       console.log(data);
    })
  }

}


