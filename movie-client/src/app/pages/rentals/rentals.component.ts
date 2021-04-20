import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { RentalService } from './../../services/rental.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  isPausing: boolean = false;
  isDeleting: boolean = false;
  cancelModalConfig: any = {
    show: false,
    data: null
  }
  pauseModalConfig: any = {
    show: false,
    data: null
  }
  deleteModalConfig: any = {
    show: false,
    data: null
  }

  userId = null;

  constructor(
    public rentalService: RentalService,
    public authService: AuthService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.user_id || null;
    if (this.authService.isAuth) {
      this.initRentals();    
    } else {
      this.authService.rawUserSubjectInstance.subscribe((user) => {
        this.initRentals();
      })
    }
  }

  initRentals() {
    if (this.userId || this.authService.isUser) {
      this.loadUserRentals(this.userId || this.authService.me._id);
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
        let rentals = response.result.map((rent) => {
          let index = this.rentals.findIndex(r => r._id == rent._id);
          if (index > -1 && this.rentals[index].hasOwnProperty('expanded')) {
            rent['expanded'] = this.rentals[index]['expanded'];
          } else {
            rent['expanded'] = false;
          }
          return rent;
        });
        this.rentals = rentals;
      }
    })
  }

  toggleRental(rent) {
    let index = this.rentals.findIndex(d => d._id == rent._id);
    if (index > -1) {
      this.rentals[index]['expanded'] = !this.rentals[index]['expanded'];
    }
  }

  cancelRental(movie, user, confirm=false) {
    if (!confirm) {
      this.cancelModalConfig.data = {
        movie,
        user
      };
      this.cancelModalConfig.show = true;
      return;
    }
    this.isCanceling = true;
    this.rentalService.rentActions(
      user,
      movie.movie._id,
      'canceled',
      !movie.canceled
    ).pipe(finalize(() => {
      this.isCanceling = false;
    })).subscribe(response => {
      if (response.success) {
        this.cancelModalConfig.show = false;
        this.initRentals();
      }
    })
  }

  pauseRental(movie, user, confirm: boolean = false) {
    if (!confirm) {
      this.pauseModalConfig.data = {
        movie,
        user
      };
      this.pauseModalConfig.show = true;
      return;
    }
    this.isPausing = true;
    this.rentalService.rentActions(
      user,
      movie.movie._id,
      'paused',
      !movie.paused
    ).pipe(finalize(() => {
      this.isPausing = false;
    })).subscribe(response => {
      if (response.success) {
        this.pauseModalConfig.show = false;
        this.initRentals();
      }
    })
  }

  deleteRental(movie, user, confirm: boolean = false) {
    if (!confirm) {
      this.deleteModalConfig.data = {
        movie,
        user
      };
      this.deleteModalConfig.show = true;
      return;
    }
    this.isDeleting = true;
    this.rentalService.deleteRental(
      user,
      movie.movie._id
    ).pipe(finalize(() => {
      this.isDeleting = false;
    })).subscribe(response => {
      if (response.success) {
        this.deleteModalConfig.show = false;
        this.initRentals();
      }
    })
  }
}
