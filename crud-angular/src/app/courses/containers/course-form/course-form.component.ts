import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  course!: Course
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  })

  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CoursesService, private snackBar: MatSnackBar, private location: Location, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({next: ({course}) => this.course = course})
    // this.course = this.activatedRoute.snapshot.data['course']
    this.form.setValue({_id: this.course._id, name: this.course.name, category: this.course.category})
  }

  onSubmit(){
    this.courseService.save(this.form.value).subscribe({
      next: result => this.onSuccess(),
      error: error => this.onError()
    })
  }

  onCancel(){
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', 'X', {duration: 5000})
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!', 'X', {duration: 5000})
  }
}
