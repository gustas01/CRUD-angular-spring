import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  if(route.params && route.paramMap.get('id')){
    return inject(CoursesService).findById(route.paramMap.get('id')!)
  }
  return of({_id: '', name: '', category: ''});
};
