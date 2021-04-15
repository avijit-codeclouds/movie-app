import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
import { ListComponent as CustomersListComponent } from './customers/list.component';
import { ListComponent as MoviesListComponent } from './movies/list.component';
import { ListComponent as RentalsListComponent } from './rental/list.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    PageComponent, 
    CustomersListComponent,
    MoviesListComponent,
    RentalsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
