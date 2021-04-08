import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {GenerService} from '../services/gener.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
  isShowDivIf = false;
  status=false;
  icon:boolean;
  isActive = true;

  faUser = ['fas', 'square'];
  faUserDefault = ['fas', 'square'];
  faUserCheck = ['fas', 'check-square'];

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

  toggle(): boolean {
    return this.isActive = !this.isActive;
  }

  onClickBtn(e) {
    this.toggle() ? this.faUserDefault = this.faUser : this.faUserDefault = this.faUserCheck;
  }

  // changeStatus(e){
  
  //   console.log('wishlist not added');
  //   console.log(e.target.className)
  //   console.log(e.target.classList);
  //   // e.target.addClass(e.target,"bi bi-heart-fill");
  //   // e.target.className.baseVal='bi bi-heart-fill'
  //   // e.target.classList.remove(e.target.className.baseVal);
  //   this.status = !this.status;
  //   this.icon=true;
  //   console.log('wishlist  added');
  //       e.target.classList.value='bi bi-heart-fill'
  //       e.target.className.baseVal='bi bi-heart-fill'
  //       e.target.className.animVal='bi bi-heart-fill'

  //   console.log(e.target.className)
  //   this.status=false;
  //   e.target.className.baseVal='bi bi-heart'
  //   // e.target.classList.value='bi bi-heart'
  //   // e.target.className.animVal='bi bi-heart'
  //   // console.log(e.target.classList);
  //   // e.target.classList.remove('bibi-heart');
  //   // e.target.classList.add(e.target.className.baseVal);
  
  // }
  // changewishList(e){
  //   console.log('wishlist added');
  //   console.log(e.target.classList);
  //   // e.target.addClass(e.target,"bi bi-heart-fill");
  //   // e.target.className.baseVal='bi bi-heart-fill'
  //   // e.target.classList.remove(e.target.className.baseVal);
  //   this.status = !this.status;
  //   console.log('wishlist not added');
  //       e.target.classList.value='bi bi-heart'
  //       e.target.className.animVal='bi bi-heart'

  //   console.log(e.target.className)
  //   this.status=false;
  //   e.target.className.baseVal='bi bi-heart-fill'
  //   // e.target.className.animVal='bi bi-heart'
  //   // console.log(e.target.classList);
  //   // e.target.classList.remove('bibi-heart');
  //   // e.target.classList.add(e.target.className.baseVal);
  // }
}


