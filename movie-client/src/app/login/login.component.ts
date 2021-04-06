import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  className : any = ''
  msg : any = ''
  enableMessage: boolean = false

  constructor(
    public router: Router,public formBuilder: FormBuilder,
    public authService: AuthService,
  ) { 
    if(localStorage.getItem("user")!=null){
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  loginUser(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value)
    this.authService.login(this.form.value).subscribe(res => {
      // console.log(res)
      if(res.success == false){
        this.msg = res.message
        this.enableMessage = true
        this.className = 'alert-danger'
        // this.form.controls['name'].setValue('');
        // this.form.reset()
        setTimeout( () => {
          this.enableMessage = false
        }, 3000)
      }else{
        // console.log(res)
        this.authService.saveToken(res.token)
        // this.redirect.emit(this.loggedInText);//emits the data to the parent
        this.router.navigateByUrl("/");
      }
    },err => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

}
