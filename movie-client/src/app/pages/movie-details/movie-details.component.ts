import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ReviewService } from './../../services/review.service';
import { NotificationService } from './../../services/notification.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId = null;
  loadingMovie: boolean = false;
  movie = null;
  reviewText: string = "";
  isReviewAnonymous: boolean = false;
  reviews: Array<any> = [];
  sortBy: string = '-createdAt';

  reviewConfig = {
    showForm: false,
  };
  isInWishlist: boolean = false;
  togglingFav: boolean = false;

  rentModal = {
    working: false,
    show: false
  }

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
    private titleService: Title,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id || null;

    this.loadMovie(this.movieId);
    this.loadReviews(this.movieId);
    this.getWishlist();
  }

  loadMovie(movieId) {
    this.loadingMovie = true;
    this.movieService.getSingleMovie(movieId).pipe(finalize(() => {
      this.loadingMovie = false;
    })).subscribe((response) => {
      if (response.success) {
        this.movie = response.result;
        this.movie.embed = 'https://www.youtube.com/embed/' + this.getUrlParameter(this.movie.trailerUrl, 'v');
        this.titleService.setTitle(this.movie.title + ' ::Movie-App');
      }
    }, (error) => {
      this.router.navigate(['404']);
    });
  }

  getUrlParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  loadReviews(movieId) {
    this.reviewService.getReviews(movieId, this.sortBy).pipe(finalize(() => {

    })).subscribe((response) => {
      if (response.success) {
        this.reviews = response.result.map((r) => {
          r['postedAgo'] = moment.utc(r.createdAt).local().fromNow();
          return r;
        });
      }
    })
  }

  toggleReviewForm() {
    this.reviewConfig.showForm = !this.reviewConfig.showForm;
  }

  saveReview() {
    console.log(this.reviewText);
    let data = {
      review: this.reviewText,
      // movieId: this.movieId,
      isAnonymous: this.isReviewAnonymous
    }
    this.reviewService.saveReviews(this.movieId, data).pipe(finalize(() => {

    })).subscribe((response) => {
      if (response.success) {
        this.reviewText = '';
        this.isReviewAnonymous = false;
        this.toggleReviewForm();
        this.loadReviews(this.movieId);
      } else {
        this.notificationService.toast('An Error Occured');
      }
    }, (error) => {
      this.notificationService.toast(error.message);
    })
  }

  rentMovie(confirmed: boolean = false) {
    if (!confirmed) {
      this.rentModal.show = true;
      return;
    }

    this.rentModal.show = true;
    this.rentModal.working = true;
    this.movieService.rentMovies({
      movie: this.movieId,
      user: this.authService.me._id
    }).pipe(finalize(() => {
      this.rentModal.working = false;
      this.rentModal.show = false;
    })).subscribe(res => {
      if (res.success == true) {
        this.notificationService.toast('Successfully you have subscribed')
      } else {
        this.notificationService.toast(res.message)
      }
    })
  }

  toggleFav() {
    this.togglingFav = true;
    this.movieService.fetchData({
      movies: this.movieId,
      checked: !this.isInWishlist,
    }).finally(() => this.getWishlist());
  }

  getWishlist() {
    this.movieService.getMovieWishlist().pipe(finalize(() => {
      this.togglingFav = false;
    })).subscribe((response) => {
      if (response.success) {
        for (let wl of response.result) {
          if (wl.user == this.authService.me._id) {
            this.isInWishlist = wl.movies.some(movie => movie._id == this.movieId);
          }
        }
      }
    });
  }

  changeSort() {
    this.loadReviews(this.movieId);
  }
}
