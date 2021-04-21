import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { MatProgressSpinnerModule, MatProgressBarModule,
  MatSnackBarModule } from '@angular/material'
  import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,MatProgressBarModule,MatSnackBarModule,
    TooltipModule
  ]
})
export class MoviesModule {
  constructor() {
    library.add(faSquare, faCheckSquare);
  }
 }
