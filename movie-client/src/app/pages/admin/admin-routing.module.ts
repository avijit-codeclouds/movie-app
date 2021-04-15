import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 
import { DashboardComponent } from './dashboard/dashboard.component'
import { PageComponent } from './page/page.component';
import { ListComponent as CustomersListComponent } from './customers/list.component';
import { ListComponent as MoviesListComponent } from './movies/list.component';
import { ListComponent as RentalsListComponent } from './rental/list.component';
import { IsAdminGuard } from './../../guards/is-admin.guard';


const routes: Routes = [
  {
    path: "admin",
    component: PageComponent,
    data: {title: ''},
    canActivate: [IsAdminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'customers',
        component: CustomersListComponent,
        data: {
          title: 'Customers'
        }
      },
      {
        path: 'movies',
        component: MoviesListComponent,
        data: {
          title: 'Movies'
        }
      },
      {
        path: 'rentals',
        component: RentalsListComponent,
        data: {
          title: 'Rentals'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
