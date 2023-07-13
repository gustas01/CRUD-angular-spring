import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder){}

  onSubmit(){
    console.log('submit');

  }

  onCancel(){
    console.log('cancel');

  }
}
