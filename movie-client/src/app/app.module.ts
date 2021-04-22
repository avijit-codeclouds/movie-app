import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtInterceptor } from './guards/jwt.interceptor'
import { MatProgressSpinnerModule, MatProgressBarModule,
  MatSnackBarModule } from '@angular/material'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { NewmovieComponent } from './pages/newmovie/newmovie.component';
import { UpdatemovieComponent } from './pages/updatemovie/updatemovie.component';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { GenerComponent } from './pages/gener/gener.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './shared/modal/modal.component'; 
import { TooltipModule } from 'ng2-tooltip-directive';
import { MoviesComponent } from './pages/movies/movies.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CustomersComponent,
    RentalsComponent,
    NewmovieComponent,
    UpdatemovieComponent,
    LogoutComponent,
    GenerComponent,
    NotfoundComponent,
    WishlistComponent,
    ModalComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MatProgressSpinnerModule,MatProgressBarModule,MatSnackBarModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TooltipModule,
    LoadingBarHttpClientModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
