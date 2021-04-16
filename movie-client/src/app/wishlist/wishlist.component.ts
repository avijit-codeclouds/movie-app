import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  query;
  p;
  wishList = [];
  constructor(public movieservice:MovieService,public authservice:AuthService) { }

  ngOnInit() {
    this.getWishlist();
  }
  getWishlist() {
    this.movieservice.getMovieWishlist().subscribe((data) => {
      console.log(data);
      this.wishList = data["result"];
      //  console.log( this.wishList);
    });
  }
  

}
