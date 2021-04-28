import { Component, OnInit } from "@angular/core";
import { MovieService } from "./../../services/movie.service";
import { GenerService } from "./../../services/gener.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from "rxjs/operators";
import * as moment from 'moment';
@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
  movies: Array<any> = [];
  generes: [];
  p;
  query;
  movie:any = 0;
  storeMovies: Array<any> = [];
  wishList = [];
  showProgress: boolean = false;
  selectedGenre: string = 'all';
  loadingMovies: boolean = false;
  loadingGenres: boolean = false;

  deleteRestoreModalConfig: any = {
    show: false,
    data: null,
    working: false
  };
  sortKey: string = '-createdAt';

  constructor(
    public movieservice: MovieService,
    public genereservice: GenerService,
    public authservice: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getGenere();
    this.getMovies();
    if (this.authservice.isUser) {
      this.getWishlist();
    }
  }

  openSnackBar(message: string, action: string = 'Done') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getGenre(genreType) {
    if (genreType == "all") {
      this.movies = this.storeMovies;
    } else {
      this.p = 1;
      this.movies = this.filterData(genreType, this.storeMovies);
    }
    this.selectedGenre = genreType;
  }

  filterData(type, movieList) {
    return movieList.filter((object) => {
      try {
        return object["genre"]["name"] == type;
      } catch (e) {
        return false;
      }
    });
  }

  getMovies() {
    this.loadingMovies = true;
    this.movieservice.movieList(this.sortKey).pipe(finalize(() => {
      this.loadingMovies = false;
    })).subscribe((data) => {
      this.movies = data["result"].map((item) => {
        item['renting'] = false;
        item['uploadedAt'] = moment.utc(item.createdAt).local().format("MMM Do YYYY, hh:mm a");
        return item;
      });
      this.movie=this.movies.length;
      this.storeMovies = this.movies;
      this.getGenre(this.selectedGenre)
    });
  }
  
  getGenere() {
    this.loadingGenres = true;
    this.genereservice.generList().pipe(finalize(() => {
      this.loadingGenres = false;
    })).subscribe((data) => {
      this.generes = data["result"];
    });
  }

  getWishlist() {
    this.movieservice.getMovieWishlist().subscribe((data) => {
      this.wishList = data["result"];
      //  console.log( this.wishList);
    });
  }

  getStatus(_id) {
    if (this.wishList.length == 0) return false;
    if (!_id) {
      return false;
    } else {
      let stat = 0;
      this.wishList[0].movies.map((e) => {
        if (e._id == _id) stat++;
      });

      if (stat > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  rentMovie(movie_id) {
    let payload = {
      movie: movie_id,
      user: this.authservice.me._id
    }
    // this.showProgress = true
    let index = this.movies.findIndex(item => item._id == movie_id);
    if (index > -1) {
      this.movies[index].renting = true;
    }
    this.movieservice.rentMovies(payload).pipe(finalize(() => {
      if (index > -1) {
        this.movies[index].renting = false;
      }
      this.getMovies();
    })).subscribe(res => {
      // this.showProgress = false
      if (res.success == true) {
        this.openSnackBar('Successfully you have subscribed')
      } else {
        this.openSnackBar(res.message)
      }
    }, err => {
      console.log(err)
    })
  }

  async wishListClicked(itemId: any, event) {
    let data = {
      movies: itemId,
      checked: event.target.checked,
    };

    this.showProgress = true;
    const res = await this.movieservice.fetchData(data);
    this.showProgress = false
    this.openSnackBar('Successfully Updated Movie Wishlist')
    this.getWishlist();
  }

  deleteMovie(_id: any) {
    this.movieservice.deleteMovie(_id).pipe(finalize(() => {
      this.deleteRestoreModalConfig.working = false;
    })).subscribe((response) => {
      if (response.success) {
        this.deleteRestoreModalConfig.show = false;
        this.openSnackBar("Successfully deleted movie");
        this.getMovies();
      }
    });
  }

  deleteOrRestoreMovie(movie, confirm = false) {
    if (!confirm) {
      this.deleteRestoreModalConfig.data = {
        movie: movie,
      };
      this.deleteRestoreModalConfig.show = true;
      return;
    }

    this.deleteRestoreModalConfig.working = true;
    if (this.deleteRestoreModalConfig.data.movie.isDeleted) {
      this.restoreMovie(this.deleteRestoreModalConfig.data.movie._id);
    } else {
      this.deleteMovie(this.deleteRestoreModalConfig.data.movie._id);
    }
  }

  restoreMovie(_id) {
    this.movieservice.restoreMovie(_id).pipe(finalize(() => {
      this.deleteRestoreModalConfig.working = false;
    })).subscribe((response) => {
      if (response.success) {
        this.deleteRestoreModalConfig.show = false;
        this.openSnackBar("Successfully restored movie");
        this.getMovies();
      }
    });
  }

  sortBy(key) {
    if (this.sortKey.startsWith('-') && this.sortKey == ('-' + key)) {
      this.sortKey = key;
    } else {
      if (this.sortKey == key) {
        this.sortKey = '-' + key;
      } else {
        this.sortKey = '-' + key;
      }
    }

    this.getMovies();
  }

  openMovie(movie) {
    this.router.navigate([
      "movie", movie._id
    ]);
  }

  changeSort() {
    this.getMovies();
  }
}
