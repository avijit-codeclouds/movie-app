import { Component, OnInit } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { GenerService } from "../services/gener.service";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
  token: boolean;
  movies: any;
  generes: [];
  query;
  p;
  storeMovies: [];
  isShowDivIf = false;
  status: any;
  icon: boolean;
  isActive = true;
  SelectedIDs: any = [];
  user_id: any;
  isChecked: any;
  wishList = [];
  emptyArr = [];
  clickeItem: number = 0;

  constructor(
    public movieservice: MovieService,
    public genereservice: GenerService,
    public authservice: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.user_id = localStorage.getItem("user_id");
    if (localStorage.getItem("user") === null) {
      this.token = true;
    } else {
      console.log("Unauthorized");
    }
    this.getGenere();
    this.getMovies();
    this.getWishlist();
  }

  getGenre(genreType) {
    if (genreType == "all") {
      this.movies = this.storeMovies;
    } else {
      this.p = 1;
      this.movies = this.filterData(genreType, this.storeMovies);
    }
  }

  filterData(type, movieList) {
    return movieList.filter((object) => {
      return object["genre"]["name"] == type;
    });
  }

  getMovies() {
    this.movieservice.movieList().subscribe((data) => {
      this.movies = data["result"];
      console.log(data["result"]);
      this.storeMovies = this.movies;
    });
  }
  getGenere() {
    this.genereservice.generList().subscribe((data) => {
      this.generes = data["result"];
    });
  }
  getWishlist() {
    this.movieservice.getMovieWishlist().subscribe((data) => {
      console.log(data);
      this.wishList = data["result"];
      //  console.log( this.wishList);
    });
  }
  getStatus(_id) {
    if (!_id) {
      return false;
    } else {
      let stat = 0;
      this.wishList[0].movies.map((e) => {
        if (e == _id) stat++;
      });
      console.log(stat);
      if (stat > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  // selectID(_id, event) {
  //   let data = {
  //     user: this.user_id,
  //     movies: [_id],
  //   };
  //   window.location.reload();
  //   this.movieservice.movieWishlist(data).subscribe((data) => {
  //     console.log(data);
  //     window.location.reload();
  //     // data.data.movies.forEach(chk => {
  //     //   console.log(chk.isChecked)
  //   });
  //   //   // this.isChecked=data.data.movies[0].isChecked
  //   //   // console.log();
  //   //    this.ngOnInit();
  //   // })
  // }

  rentMovie(movie_id){
    console.log('clicked')
    console.log(movie_id)
  }

  async wishListClicked(itemId: any, event) {
    this.clickeItem++;
    console.log("clicked");
    console.log(`clickeItem :: ${this.clickeItem}`);
    // this.buttonClicked.next(itemId);
    let data = {
      movies: itemId,
      checked: event.target.checked,
    };
    console.log(data);
    // Promise.all([
    //   this.movieservice.fetchData(data)
    // ]).then(res => {
    //   console.log(res)
    //   console.log('all done')
    //   console.log(this.clickeItem)
    // });
    const res = await this.movieservice.fetchData(data);
    // this.getMovies();
    // this.getWishlist();
    console.log(res);
  }

  clickMethod(_id: string) {
    if (confirm("Are you sure to delete this movie??")) {
      this.movieservice.deleteMovie(_id).subscribe((data) => {
        console.log(data);
        alert("Successfully deleted");
        this.ngOnInit();
      });
    }
  }
}
