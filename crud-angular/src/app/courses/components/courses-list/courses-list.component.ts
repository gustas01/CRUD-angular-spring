import { Component, Input } from '@angular/core';
import { Course } from '../../model/course';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input({required: true}) courses: Course[] = []
  @Output() add = new EventEmitter<boolean>()
  @Output() edit = new EventEmitter<Course>()

  readonly displayedColumns = ['name', 'category', 'actions']

  constructor(){}

  onAdd(){
    this.add.emit(true)
   }

   onEdit(course: Course){
      this.edit.emit(course)
   }
}
