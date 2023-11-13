import {Injectable} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';

type ValidationErrorType = ValidationErrors | null | undefined;

@Injectable()
export class FormService {

  dateValidator(control: FormControl): ValidationErrors | null {
    return new Date(control.value as string | number | Date) >
    new Date() ? {futureDate: true} : null;
  }

  getTitleError(errors: ValidationErrorType, field: string): string {
    if (errors?.['required']) {
      return `Please enter a ${field}`;
    }
    if (errors?.['minlength']) {
      return `The ${field} is too short`;
    }
    if (errors?.['maxlength']) {
      return `The ${field} is too long`;
    }
    return '';
  }

  getDateError(errors: ValidationErrorType): string {
    if (errors?.['required']) {
      return 'Please enter a creation date';
    }
    if (errors?.['invalidDate']) {
      return 'The date is invalid';
    }
    return '';
  }

  getErrorMessage(errors: ValidationErrorType, field: string): string {
    return errors?.['required'] ? `Please enter a ${field}` : '';
  }
}
