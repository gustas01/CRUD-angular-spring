import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validadeAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof UntypedFormControl){
        control.markAsTouched({onlySelf: true});
      }else if(control instanceof UntypedFormGroup || control instanceof UntypedFormArray){
        control.markAsTouched({onlySelf: true});
        this.validadeAllFormFields(control)
      }
    })
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string){
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }


  getErrorMessageFromField(field: UntypedFormControl){
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

    return 'Campo inválido!';
  }


  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number){
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }


  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string){
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}
