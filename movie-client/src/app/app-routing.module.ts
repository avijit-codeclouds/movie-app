import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { RentalsComponent } from './rentals/rentals.component';
import { NewmovieComponent } from './newmovie/newmovie.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';
import { LogoutComponent } from './logout/logout.component'

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', loadChildren: './movies/movies.module#MoviesModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
  { path: 'movies/new', component: NewmovieComponent },
  { path: 'movies/:movie_id',component: UpdatemovieComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
