import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MovieService } from '../services/movie.service';
import { GenerService } from '../services/gener.service';

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
      stock: ['',Validators.required],
      rate:['',Validators.required]
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
        this.movieservice.genreList().subscribe(res => {
          this.genreList = res.genere
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

  updateMovie(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
  }

}
