import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MovieService } from './../../services/movie.service';
import { GenerService } from './../../services/gener.service';
import { title } from 'process';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {

  movie_id: any
  getMovie: any
  genreList : string
  form: FormGroup;
  submitted = false;
  className : any = ''
  msg : any = ''
  enableMessage: boolean = false
  showProgress : boolean = false

  // reactiveForm = new FormGroup({
  //   title: new FormControl(),
  //   stock: new FormControl(),
  //   rate: new FormControl()
  // })
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private movieservice:MovieService , private genereservice:GenerService
  ) { 
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      genre : ['', Validators.required],
      year: [2020,Validators.required],
      rate:['',Validators.required],
      rating: [0, [Validators.required]],
      trailerUrl: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  get fc() { return this.form.controls; }

  ngOnInit() {
    this.movie_id = this.activatedRoute.snapshot.params['movie_id']
    console.log(this.movie_id)
    this.movieservice.getSingleMovie(this.movie_id).subscribe(res => {
      if(res.success == false){
        this.router.navigateByUrl("/404");      
      }else{
        const { title, genre, year, rate, description, rating, trailerUrl } = res.result
        let movieData = {
          title,
          genre,
          year,
          rate,
          rating,
          trailerUrl,
          description
        };
        this.form.patchValue(movieData)
        this.movieservice.genreList().subscribe(res => {
          this.genreList = res.result
        },err => {
          console.log(err)
        })
        this.getMovie = res.result
      }
    },err => {
      if(err.error.success == false){
        this.router.navigateByUrl("/404");      
      }
    })
  }

  openSnackBar(message: string, action: string = 'Done') { 
    // openSnackBar('GAME ONE','HURRAH !!!!!')
    this._snackBar.open(message, action, { 
      duration: 2000, 
    }); 
  } 

  updateMovie(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.showProgress = true
    this.movieservice.updateMovie(this.form.value,this.movie_id).subscribe(res => {
      if(res.success == true){
        this.showProgress = false
        this.openSnackBar('Movie updated')
        setTimeout(()=>{
          this.router.navigateByUrl("/");
        },1000)
      }
    },err => {
      this.showProgress = false
      console.log(err)
    })
  }

}
