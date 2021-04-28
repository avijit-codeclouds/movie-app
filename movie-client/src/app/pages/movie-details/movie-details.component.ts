import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ReviewService } from './../../services/review.service';

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
  reviews: Array<any> = [];

  reviewConfig = {
    showForm: false,
  };

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id || null;

    this.loadMovie(this.movieId);
    this.loadReviews(this.movieId);
  }

  loadMovie(movieId) {
    this.loadingMovie = true;
    this.movieService.getSingleMovie(movieId).pipe(finalize(() => {
      this.loadingMovie = false;
    })).subscribe((response) => {
      if (response.success) {
        this.movie = response.result;
        this.movie.embed = 'https://www.youtube.com/embed/' + this.getUrlParameter(this.movie.trailerUrl, 'v')
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
    this.reviewService.getReviews(movieId).pipe(finalize(() => {

    })).subscribe((response) => {
      if (response.success) {
        this.reviews = response.result;
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
      isAnonymous: true
    }
    this.reviewService.saveReviews(this.movieId, data).pipe(finalize(() => {

    })).subscribe((response) => {
      if (response.success) {
        this.reviewText = '';
        this.toggleReviewForm();
        this.loadReviews(this.movieId);
      }
    })
  }

}
