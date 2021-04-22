import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { NotificationService } from './../../services/notification.service';
import * as moment from 'moment';

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

  paginationConfig = {
    page: 1,
    limit:15
  }

  constructor(
    public router: Router,public formBuilder: FormBuilder,
    public authService: AuthService,
    public customerService: CustomerService,
    public notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadCustomers();    
  }

  loadCustomers() {
    this.loadingCustomers = true;
    this.customerService.loadCustomers(this.authService.isAuth ? this.authService.me.id : null, this.paginationConfig).pipe(finalize(() => {
      this.loadingCustomers = false;
    })).subscribe(response => {
      if (response.success) {
        this.customers = response.result.map((customer) => {
          customer['user']['formatedDate'] = moment(customer.user.date).format("MMM Do YYYY")
          return customer;
        });
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
    this.customerService.toggleLock(customer.user._id, !customer.isLocked).pipe(finalize(() => {
      this.lockUnlockModalConfig.working = false;
    })).subscribe((response) => {
      if (response.success) {
        this.lockUnlockModalConfig.show = false;
        this.loadCustomers();
      }
      this.notificationService.toast(response.message);
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
      // if (response.success) {
        this.deleteModalConfig.show = false;
        this.loadCustomers();
        this.notificationService.toast('Customer Successfully Deleted');
      // }
    })
  }

  previousPage() {
    if (this.paginationConfig.page == 1 || this.loadingCustomers) return;
    this.paginationConfig.page -=1;
    this.loadCustomers();
  }

  nextPage() {
    if (this.customers.length < this.paginationConfig.limit || this.loadingCustomers) return;
    this.paginationConfig.page +=1;
    this.loadCustomers();
  }

}
