import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { MovieService } from "./../../services/movie.service";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs/operators";
import { RentalService } from '../../services/rental.service';
@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
  query;
  p;
  msg:any;
  wishList = [];
  fav:any;
  loadingMovies: boolean = false;
  showProgress: boolean = false;
  jwtHelper = new JwtHelperService();
  user: any;
  getUserId: any;
  cancelModalConfig: any = {
    show: false,
    data: null,
  };
  isCanceling: boolean = false;

  rentMovieConfig = {
    show: false,
    movie: null,
    working: false,
    index: null
  };

  constructor(
    public movieservice: MovieService,
    public authservice: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private rentalService: RentalService
  ) {
    this.authservice.user.subscribe((x) => (this.user = x));
    const decode = this.jwtHelper.decodeToken(this.user);
    this.getUserId = decode["id"];
  }
  ngOnInit() {
    this.getWishlist();
  }
  openSnackBar(message: string, action: string = "Done") {
    // openSnackBar('GAME ONE','HURRAH !!!!!')
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getWishlist() {
    this.loadingMovies = true;
    this.movieservice
      .getMovieWishlist()
      .pipe(
        finalize(() => {
          this.loadingMovies = false;
        })
      )
      .subscribe((data) => {
        this.wishList = data["result"].map(item => {
          item.movies = item.movies.map(fav => {
            fav['renting'] = false;
            fav['isRented'] = false;
            return fav;
          })
          this.loadRental(item.user);
          return item;
        });
        // this.fav=this.wishList[0].movies.length;
        // if(this.wishList[0].movies.length==0){
        //   this.msg="No Wishlist Available"
        // }
      });

    // this.movieservice.getMovieWishlist().subscribe((data) => {
    //   console.log(data);
    //   this.wishList = data["result"];
    //   //  console.log( this.wishList);
    // });
  }

  loadRental(userId) {
    this.rentalService.userMovies(userId).subscribe(response => {
      if (response.success) {
        let uIndex = this.wishList.findIndex(u => u.user == userId);
        if (uIndex < 0) return;
        for (let movie of response.result.movies) {
          if (!movie.expired && !movie.canceled) {
            let mIndex = this.wishList[uIndex].movies.findIndex(m => m._id == movie.movie._id);
            if (mIndex > -1) {
              this.wishList[uIndex].movies[mIndex].isRented = true;
            }
          }
        }
      }
    })
  }

  deleteFav(_id, confirm = false) {
    if (!confirm) {
      this.cancelModalConfig.data = {
        _id,
      };
      this.cancelModalConfig.show = true;
      return;
    }
    this.isCanceling = true;
    this.showProgress = true;
    this.movieservice
      .deleteMovieWishlist(_id)
      .pipe(
        finalize(() => {
          this.isCanceling = false;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.cancelModalConfig.show = false;
          this.showProgress = false;
          this.openSnackBar("Successfully deleted movie from wishlist");
          this.ngOnInit();
        }
      });
  }

  rentMovie(movie, loopIndex, confirm: boolean = false) {
    if (!confirm) {
      this.rentMovieConfig.index = loopIndex;
      this.rentMovieConfig.movie = movie;
      this.rentMovieConfig.show = true;
      return;
    }

    let payload = {
      movie: movie._id,
      user: this.getUserId,
    };
    // this.showProgress = true;
    let index = this.wishList[loopIndex].movies.findIndex(item => item._id == movie._id);
    if (index > -1) {
      this.wishList[loopIndex].movies[index].renting = true;
    }
    this.rentMovieConfig.working = true;
    this.movieservice.rentMovies(payload).pipe(finalize(() => {
      if (index > -1) {
        this.wishList[loopIndex].movies[index].renting = false;
      }
      this.rentMovieConfig.working = false;
    })).subscribe(
      (res) => {
        // console.log(res);
        // this.showProgress = false;
        if (res.success == true) {
          this.openSnackBar("Successfully you have subscribed");
        } else {
          this.openSnackBar(res.message);
        }
        this.rentMovieConfig.show = false;
        this.getWishlist();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
