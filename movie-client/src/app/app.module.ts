import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtInterceptor } from './guards/jwt.interceptor'
import { MatProgressSpinnerModule, MatProgressBarModule,
  MatSnackBarModule } from '@angular/material'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { RentalsComponent } from './rentals/rentals.component';
import { NewmovieComponent } from './newmovie/newmovie.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { GenerComponent } from './gener/gener.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; 

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MatProgressSpinnerModule,MatProgressBarModule,MatSnackBarModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
