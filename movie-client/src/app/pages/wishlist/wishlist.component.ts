import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MovieService } from './../../services/movie.service';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { finalize } from "rxjs/operators";
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  query;
  p;
  wishList = [];
  loadingMovies: boolean = false;
  showProgress : boolean = false;
  jwtHelper = new JwtHelperService();
  user : any;
  getUserId : any;
  constructor(
    public movieservice: MovieService,
    public authservice: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.authservice.user.subscribe(x => this.user = x);
    const decode = this.jwtHelper.decodeToken(this.user);
    this.getUserId = decode['id'] 
  }
  ngOnInit() {
    this.getWishlist();
  }
    openSnackBar(message: string, action: string = 'Done') { 
      // openSnackBar('GAME ONE','HURRAH !!!!!')
      this._snackBar.open(message, action, { 
        duration: 2000, 
      }); 

  }
  getWishlist() {
    this.loadingMovies = true;
    this.movieservice.getMovieWishlist().pipe(finalize(() => {
      this.loadingMovies = false;
    })).subscribe((data) => {
      this.wishList = data["result"];
    });

    // this.movieservice.getMovieWishlist().subscribe((data) => {
    //   console.log(data);
    //   this.wishList = data["result"];
    //   //  console.log( this.wishList);
    // });
  }
  deleteFav(_id){
    if (confirm("Are you sure to delete this movie??")) {
      this.showProgress = true
      console.log(_id)
      this.movieservice.deleteMovieWishlist(_id).subscribe((data) => {
        this.showProgress = false
        console.log(data);
        this.openSnackBar("Successfully deleted movie from wishlist");
        this.ngOnInit();
      });
    }
  }
  rentMovie(movie_id){
    console.log('clicked')
    console.log(movie_id)
    let payload = {
      movie : movie_id,
      user : this.getUserId
    }
    this.showProgress = true
    this.movieservice.rentMovies(payload).subscribe(res => {
      console.log(res)
      this.showProgress = false
      if(res.success == true){
        this.openSnackBar('Successfully you have subscribed')
      }else{
        this.openSnackBar(res.message)
      }
    },err => {
      console.log(err)
    })
  }
}

