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
  { 
    path: '', 
    loadChildren: './pages/movies/movies.module#MoviesModule',
    data: {
      title: 'Movies ::Movie-App'
    }
  }, { 
    path: 'register', 
    component: RegisterComponent, 
    data: {
      title: 'Register ::Movie-App'
    }
  }, { 
    path: 'login', 
    component: LoginComponent, 
    data: {
      title: 'Login ::Movie-App'
    }
  }, { 
    path: 'customers', 
    component: CustomersComponent, 
    canActivate: [AuthGuard], 
    data: {
      title: 'Customers ::Movie-App'
    }
  }, { 
    path: 'rentals', 
    component: RentalsComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Rentals ::Movie-App'
    }
  }, { 
    path: 'rentals/:user_id', 
    component: RentalsComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Rental Details ::Movie-App'
    }
  }, { 
    path: 'movies/new', 
    component: NewmovieComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Add New Movie ::Movie-App'
    }
  }, { 
    path: 'movies/:movie_id',
    component: UpdatemovieComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Movie ::Movie-App'
    }
  }, { 
    path: 'wishlist', 
    component: WishlistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Wishlish ::Movie-App'
    }
  }, { 
    path: 'logout', 
    component: LogoutComponent,
    data: {
      title: 'Logout ::Movie-App'
    }
  }, { 
    path: '404', 
    component: NotfoundComponent,
    data: {
      title: 'Page Not Found ::Movie-App'
    }
  }, { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
