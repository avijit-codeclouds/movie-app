import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Array<any> = [];
  loadingCustomers: boolean = false;

  lockUnlockModalConfig: any = {
    show: false,
    data: null,
    working: false,
  }

  deleteModalConfig: any = {
    show: false,
    data: null,
    working: false,
  }

  constructor(
    public router: Router,public formBuilder: FormBuilder,
    public authService: AuthService,
    public customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.loadCustomers();    
  }

  loadCustomers() {
    this.loadingCustomers = true;
    this.customerService.loadCustomers(this.authService.isAuth ? this.authService.me.id : null).pipe(finalize(() => {
      this.loadingCustomers = false;
    })).subscribe(response => {
      if (response.success) {
        this.customers = response.result;
      }
    })
  }

  toggleLock(customer, confirm: boolean = false) {
    if (!confirm) {
      this.lockUnlockModalConfig.data = {
        customer: customer
      }
      this.lockUnlockModalConfig.show = true;
      return;
    }

    this.lockUnlockModalConfig.working = true;
    this.customerService.toggleLock(customer.user._id).pipe(finalize(() => {
      this.lockUnlockModalConfig.working = false;
    })).subscribe((response) => {
      if (response.success) {
        this.lockUnlockModalConfig.show = false;
        this.loadCustomers();
      }
    })

  }

  deleteCustomer(customer, confirm: boolean = false) {
    if (!confirm) {
      this.deleteModalConfig.data = {
        customer: customer
      }
      this.deleteModalConfig.show = true;
      return;
    }

    this.deleteModalConfig.working = true;
    this.customerService.deleteCustomer(customer.user._id).pipe(finalize(() => {
      this.deleteModalConfig.working = false;
    })).subscribe((response) => {
      if (response.success) {
        this.deleteModalConfig.show = false;
        this.loadCustomers();
      }
    })
  }

}
