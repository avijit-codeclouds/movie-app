import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MovieService } from './../../services/movie.service';
import { Movie } from './../../model/movie';

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
  genreList : string
  showProgress : boolean = false

  constructor( public formBuilder: FormBuilder,
    public authService: AuthService,public movieservice:MovieService,
    public router: Router) { 
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        genre : ['', Validators.required],
        stock: ['',Validators.required],
        rate:['',Validators.required],
      });
  }

  get fc() { return this.form.controls; }
  
  ngOnInit() {
   
    this.movieservice.genreList().subscribe(res => {
      this.genreList = res.result
    },err => {
      console.log(err)
    })
  }
  
  addMovie(){
    this.submitted = true;
    console.log(this.form.value);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.showProgress = true
    this.movieservice.addMovie(this.form.value).subscribe(res => {
      if(res.success == true){
        this.showProgress = false
        this.msg = 'Movie saved successfully'
        this.enableMessage = true
        this.className = 'alert-success'
        // this.form.controls['name'].setValue('');
        // this.form.reset()
        setTimeout( () => {
          this.enableMessage = false
        }, 3000)
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
