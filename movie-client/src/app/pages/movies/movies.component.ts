import { Component, OnInit } from "@angular/core";
import { MovieService } from "./../../services/movie.service";
import { GenerService } from "./../../services/gener.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from "rxjs/operators";
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
  movies: Array<any> = [];
  generes: [];
  p:any = 1;
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

  rentMovieConfig = {
    show: false,
    movie: null,
    working: false
  }

  constructor(
    public movieservice: MovieService,
    public genereservice: GenerService,
    public authservice: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initDefaults();
    this.getGenere();
    this.getMovies();
    if (this.authservice.isUser) {
      this.getWishlist();
    }
  }

  initDefaults() {
    if (this.cookieService.check('movie-selected-genre')) {
      this.selectedGenre = this.cookieService.get('movie-selected-genre');
    }
    if (this.cookieService.check('movie-current-sort')) {
      this.sortKey = this.cookieService.get('movie-current-sort');
    }
    if (this.cookieService.check('movie-page')) {
      this.p = parseInt(this.cookieService.get('movie-page')) || 1;
    }
  }

  openSnackBar(message: string, action: string = 'Done') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getGenre(genreType, page=1) {
    if (genreType == "all") {
      this.movies = this.storeMovies;
    } else {
      this.p = page;
      this.movies = this.filterData(genreType, this.storeMovies);
    }
    this.selectedGenre = genreType;
    this.cookieService.set('movie-selected-genre', this.selectedGenre);
    this.p = page;
    this.cookieService.set('movie-page', this.p);
  }

  filterData(type, movieList) {
    return movieList.filter((object) => {
      try {
        if (this.authservice.isUser) {
          return object.genreData.some(g => g.name == type);
        } else {
          return object["genre"]["name"] == type;
        }
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
        if (item.description && item.description.length > 45) {
          item['showReadMore'] = true;
          item['displayDescription'] = item.description.substr(0, 45) + '...'
        } else {
          item['displayDescription'] = item.description;
          item['showReadMore'] = false;
        }
        return item;
      });
      this.movie=this.movies.length;
      this.storeMovies = this.movies;
      this.getGenre(this.selectedGenre, this.p)
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

  rentMovie(movie, confirm:boolean = false) {
    if (!confirm) {
      this.rentMovieConfig.movie = movie;
      this.rentMovieConfig.show = true;
      return;
    }

    let payload = {
      movie: movie._id,
      user: this.authservice.me._id
    }
    // this.showProgress = true
    let index = this.movies.findIndex(item => item._id == movie._id);
    if (index > -1) {
      this.movies[index].renting = true;
    }
    this.rentMovieConfig.working = true;
    this.movieservice.rentMovies(payload).pipe(finalize(() => {
      if (index > -1) {
        this.movies[index].renting = false;
      }
      this.getMovies();
      this.rentMovieConfig.working = false;
    })).subscribe(res => {
      // this.showProgress = false
      if (res.success == true) {
        this.openSnackBar('Successfully you have subscribed');
      } else {
        this.openSnackBar(res.message)
      }
      this.rentMovieConfig.show = false;
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
    this.cookieService.set('movie-current-sort', this.sortKey);
    this.getMovies();
  }

  openMovie(movie) {
    this.router.navigate([
      "movie", movie._id
    ]);
  }

  changeSort() {
    this.cookieService.set('movie-current-sort', this.sortKey);
    this.getMovies();
  }

  pageChanged(page) {
    this.p = page;
    this.cookieService.set('movie-page', page);
  }
}
