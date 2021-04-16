import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { NewmovieComponent } from './pages/newmovie/newmovie.component';
import { UpdatemovieComponent } from './pages/updatemovie/updatemovie.component';
import { LogoutComponent } from './pages/logout/logout.component'
import { NotfoundComponent } from './pages/notfound/notfound.component'
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', loadChildren: './pages/movies/movies.module#MoviesModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
  { path: 'movies/new', component: NewmovieComponent, canActivate: [AuthGuard] },
  { path: 'movies/:movie_id',component: UpdatemovieComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent,canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
