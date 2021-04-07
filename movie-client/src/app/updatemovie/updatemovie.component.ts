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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private movieservice:MovieService , private genereservice:GenerService
  ) { }

  ngOnInit() {
    this.movie_id = this.activatedRoute.snapshot.params['movie_id']
    console.log(this.movie_id)
  }

}
