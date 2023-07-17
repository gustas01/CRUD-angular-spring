import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly APIUrl = 'api/courses'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.APIUrl)
    .pipe(
      first(),
      // delay(3000),
      // tap(courses => console.log(courses))
    )
  }

  save(course: Partial<Course>){
    if(course._id)
      return this.update(course)
    return this.create(course)
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.APIUrl, course);
  }

  private update(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.APIUrl}/${course._id}`, course);
  }



  findById(id: string){
    return this.httpClient.get<Course>(`${this.APIUrl}/${id}`)
  }
}
