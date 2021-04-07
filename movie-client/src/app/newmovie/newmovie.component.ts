import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-newmovie',
  templateUrl: './newmovie.component.html',
  styleUrls: ['./newmovie.component.css']
})
export class NewmovieComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  className : any = ''
  msg : any = ''
  enableMessage: boolean = false

  constructor( public formBuilder: FormBuilder,
    public authService: AuthService,public movieservice:MovieService,
    public router: Router) { 
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        genre : ['', Validators.required],
        stock: ['',Validators.required],
        rate:['',Validators.required]
      });
    }

    get fc() { return this.form.controls; }
  ngOnInit() {
  }
  addMovie(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
  }

}
