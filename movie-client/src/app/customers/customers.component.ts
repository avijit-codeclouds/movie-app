import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerService } from './../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Array<any> = [];

  constructor(
    public router: Router,public formBuilder: FormBuilder,
    public authService: AuthService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.loadCustomers();    
  }

  loadCustomers() {
    this.customerService.loadCustomers(this.authService.isAuth ? this.authService.me.id : null).subscribe(response => {
      if (response.success) {
        this.customers = response.result;
      }
    })
  }

}
