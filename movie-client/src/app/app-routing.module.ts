import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { RentalsComponent } from './rentals/rentals.component';
import { NewmovieComponent } from './newmovie/newmovie.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', loadChildren: './movies/movies.module#MoviesModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'rentals', component: RentalsComponent },
  { path: 'movies/new', component: NewmovieComponent },
  { path: 'movies/:movie_id',component: UpdatemovieComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
