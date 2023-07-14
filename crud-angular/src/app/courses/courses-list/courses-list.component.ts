import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input({required: true}) courses: Course[] = []
  readonly displayedColumns = ['name', 'category', 'actions']

  constructor(private router: Router, private activatedRoute: ActivatedRoute){}

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
   }
}
