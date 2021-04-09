import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {GenerService} from '../services/gener.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

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
  status:any;
  icon:boolean;
  isActive = true;
  SelectedIDs:any=[];
  user_id:any;
  isChecked:any;
  // selectedItemsList = [];
  // checkedIDs = [];
  emptyArr=[];
  // faUser = ['fas', 'square'];
  // faUserDefault = ['fas', 'square'];
  // faUserCheck = ['fas', 'check-square'];

  constructor(public movieservice:MovieService , public genereservice:GenerService, public authservice:AuthService) { }

  ngOnInit() {
    this.user_id=localStorage.getItem("user_id");
    if (localStorage.getItem("user") === null) {
     this.token=true;
    }
    else{
      
      console.log('Unauthorized');
    }
    this.getGenere();
    this.getMovies();
    // this.fetchSelectedItems()
    // this.fetchCheckedIDs()
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
     console.log(data['result']);
    })
  }
  getGenere(){
    this.genereservice.generList().subscribe((data)=>{
      this.generes=data['genere']
       console.log(data);
    })
  }

  // toggle(): boolean {
  //   return this.isActive = !this.isActive;
  // }

  // onClickBtn(e) {
  //   this.toggle() ? this.faUserDefault = this.faUser : this.faUserDefault = this.faUserCheck;
     
  // }
  // changeSelection() {
  //   this.fetchSelectedItems()
  // }

  // fetchSelectedItems() {
  //   this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
  //     return value.isChecked
  //   });
  // }

  // fetchCheckedIDs() {
  //   this.checkedIDs = []
  //   this.checkboxesDataList.forEach((value, index) => {
  //     if (value.isChecked) {
  //       this.checkedIDs.push(value.id);
  //     }
  //   });
  // }


  selectID(_id, event){
    // this.SelectedIDs.push(_id);
    // console.log(this.SelectedIDs);
    let data={
      user:this.user_id,
      movies:{movie:_id,isChecked:'true'}
      
    };
    this.movieservice.movieWishlist(data).subscribe((data)=>{
      console.log(data);
       this.ngOnInit();
    })
}

}


