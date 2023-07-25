import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  course!: Course
  form!: FormGroup


  constructor(private formBuilder: NonNullableFormBuilder, private courseService: CoursesService, private snackBar: MatSnackBar, private location: Location, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({next: ({course}) => this.course = course})
    this.form = this.formBuilder.group({
    _id: [this.course._id],
    name: [this.course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: [this.course.category, [Validators.required]],
    lessons: this.formBuilder.array(this.retrieveLessons(this.course))
    });
  }

  private retrieveLessons(course: Course){
    const lessons = []
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    }else {
      lessons.push(this.createLesson())
    }
    return lessons
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName)

    if(field?.hasError('required'))
      return 'Campo obrigatório!'

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return `O tamanho mínimo deve ser de ${requiredLength} caracteres!`
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 5
      return `O tamanho máximo deve ser de ${requiredLength} caracteres!`
    }

    return 'Campo inválido!'
  }
}
