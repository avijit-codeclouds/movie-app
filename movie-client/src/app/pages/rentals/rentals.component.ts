import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { RentalService } from './../../services/rental.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  rentals: Array<any> = [];
  loadingRentals: boolean = false;
  userRentList: any = null;
  isCanceling: boolean = false;

  constructor(
    private rentalService: RentalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isAuth) {
      this.initRentals();    
    } else {
      this.authService.rawUserSubjectInstance.subscribe((user) => {
        this.initRentals();
      })
    }
  }

  initRentals() {
    if (this.authService.isUser) {
      this.loadUserRentals(this.authService.me._id);
    } else {
      this.loadRentals();
    }
  }

  loadUserRentals(userId) {
    this.loadingRentals = true
    this.rentalService.userMovies(userId).pipe(finalize(() => {
      this.loadingRentals = false;
    })).subscribe((response) => {
      if (response.success) {
        this.userRentList = response.result;
      }
    })
  }

  loadRentals() {
    this.loadingRentals = true;
    this.rentalService.rentals().pipe(finalize(() => {
      this.loadingRentals = false;
    })).subscribe(response => {
      if (response.success) {
        this.rentals = response.result.map((rent) => {
          rent['expanded'] = false;
          return rent;
        });
      }
    })
  }

  toggleRental(rent) {
    let index = this.rentals.findIndex(d => d._id == rent._id);
    if (index > -1) {
      this.rentals[index]['expanded'] = !this.rentals[index]['expanded'];
    }
  }

  cancelRental(movie) {
    // ["canceled", "paused"]
    this.isCanceling = true;
    this.rentalService.rentActions(
      this.authService.me._id,
      movie.movie,
      'canceled',
      !movie.canceled
    ).pipe(finalize(() => {
      this.isCanceling = false;
    })).subscribe(response => {
      if (response.success) {
        this.initRentals();
      }
    })
  }
}
