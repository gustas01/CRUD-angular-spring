import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class CoursesModule { }
