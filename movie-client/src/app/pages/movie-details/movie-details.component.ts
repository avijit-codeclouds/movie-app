import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId = null;
  loadingMovie: boolean = false;
  movie = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id || null;

    this.loadMovie(this.movieId);
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

}
