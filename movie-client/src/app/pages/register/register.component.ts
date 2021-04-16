import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  className : any = ''
  msg : any = ''
  enableMessage: boolean = false
  showProgress : boolean = false


  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
  }

  registerUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value)
    this.showProgress = true
    this.authService.registerUser(this.form.value).subscribe(result => {
      if(result.success == true){
        this.showProgress = false
        this.msg = 'Successfully registered!'
        this.enableMessage = true
        this.className = 'alert-success'
        // this.form.controls['name'].setValue('');
        // this.form.reset()
        setTimeout( ()=>{
          // console.log('works')
          this.enableMessage = false
          // console.log(`enableMessage :: ${this.enableMessage}`)
          this.router.navigate(['/login']);
        }, 3000)
      }else{
        this.showProgress = false
        this.msg = result.message
        this.enableMessage = true
        this.className = 'alert-danger'
        setTimeout( ()=>{
          // console.log('works')
          this.enableMessage = false
        }, 3000)
      }
    }, err => {
      this.showProgress = false
      console.log(err)
    })
  }

}
