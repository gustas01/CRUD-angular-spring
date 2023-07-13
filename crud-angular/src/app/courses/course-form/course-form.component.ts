import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup = this.formBuilder.group({
    name: [null],
    category: [null]
  })

  constructor(private formBuilder: FormBuilder, private courseService: CoursesService, private snackBar: MatSnackBar){}

  onSubmit(){
    this.courseService.save(this.form.value).subscribe({
      next: result => console.log(result),
      error: error => this.onError()
    })
  }

  onCancel(){
    console.log('cancel');
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso!', 'X', {duration: 5000})
  }
}
