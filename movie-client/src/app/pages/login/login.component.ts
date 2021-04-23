import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

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
  showProgress : boolean = false


  constructor(
    public router: Router,public formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute
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
    this.showProgress = true
    this.authService.login(this.form.value).subscribe(res => {
      
      if(res.success == false){
        this.showProgress = false
        this.msg = res.message
        this.enableMessage = true
        this.className = 'alert-danger'
        // this.form.controls['name'].setValue('');
        // this.form.reset()
        setTimeout( () => {
          this.enableMessage = false
        }, 3000)
      }else{
        this.showProgress = false
        this.authService.saveToken(res.result)
        if (this.route.snapshot.queryParams.returnUrl) {
          this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl);
        } else {
          this.router.navigateByUrl("/");
        }
      }
    },err => {
      this.showProgress = false
      console.log(err)
    })
  }

  ngOnInit() {
  }

}
