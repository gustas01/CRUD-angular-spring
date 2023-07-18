import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]> | null = null


  constructor(private coursesService: CoursesService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar){
    this.refresh()
   }

  ngOnInit(): void {}

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.activatedRoute});
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja realmente excluir o curso?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.coursesService.delete(course._id).subscribe({
          next: () => {
            this.refresh()
            this.snackBar.open("Curso deletado com sucesso!", 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'})
          },
          error: () => this.onError("Erro ao tentar remover curso!")
        });
      }
    });
  }

  refresh(){
     this.courses$ = this.coursesService.list()
    .pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
    data: errorMsg
  });
  }


}
