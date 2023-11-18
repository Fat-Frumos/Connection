import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

type ValidationErrorType = ValidationErrors | null | undefined;

const MIN_PASSWORD_LENGTH = 8;

@Injectable()
export class FormService {

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasAtSign = value.includes('@');
    const hasDot = value.includes('.');
    return hasAtSign && hasDot ? null : {invalidUsername: true};
  };

  dateValidator(control: FormControl): ValidationErrors | null {
    return new Date(control.value as string | number | Date) >
    new Date() ? {futureDate: true} : null;
  }

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /\d/.test(value);
    const hasSpecialChar = /[!@#?]/.test(value);
    const isLengthValid = value.length >= MIN_PASSWORD_LENGTH;
    return !hasUpperCase || !hasLowerCase || !hasNumeric || !hasSpecialChar || !isLengthValid
      ? {'weakPassword': true}
      : null;
  };

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
