import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatRoutingModule } from './mat-routing.module';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatRoutingModule,
    MatProgressSpinnerModule,MatProgressBarModule
  ]
})
export class MatModule { }
