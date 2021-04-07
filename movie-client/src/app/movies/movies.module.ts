import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class MoviesModule { }
