import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MovieService } from './../../services/movie.service';

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
  deleteFav(_id){
    if (confirm("Are you sure to delete this movie??")) {
      console.log(_id)
      this.movieservice.deleteMovieWishlist(_id).subscribe((data) => {
        console.log(data);
        alert("Successfully deleted");
        this.ngOnInit();
      });
    }
  }
}

