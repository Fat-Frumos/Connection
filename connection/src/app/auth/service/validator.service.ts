import {Injectable} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl, FormGroup,
  ValidationErrors, Validators
} from '@angular/forms';
import {User} from '@app/model/user.model';

const MIN_LENGTH = 8;
const MAX_LENGTH = 40;

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasAtSign = value.includes('@');
    const hasDot = value.includes('.');
    return hasAtSign && hasDot ? null : {invalidUsername: true};
  };

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /\d/.test(value);
    const hasSpecialChar = /[!@#?]/.test(value);
    const isLengthValid = value.length >= MIN_LENGTH;
    return !hasUpperCase || !hasLowerCase || !hasNumeric || !hasSpecialChar || !isLengthValid
      ? {'weakPassword': true} : null;
  };

  nameValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasMax = value.length > MAX_LENGTH;
    const hasLetter = !/^[a-zA-Z ]*$/.test(value);
    return hasMax || hasLetter ? { 'maxLength': hasMax, 'pattern': hasLetter } : null;
  };

  getFormUser(loginForm: FormGroup): User {
    return {
      name: (loginForm.get('name') as FormControl).value as User['name'],
      email: (loginForm.get('email') as FormControl).value as User['email'],
      password: (loginForm.get('password') as FormControl).value as User['password']
    };
  }

  getFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      name: ['', [Validators.required.bind(Validators), this.nameValidator]],
      email: ['', [Validators.required.bind(Validators), this.emailValidator]],
      password: ['', [Validators.required.bind(Validators), this.passwordValidator]]
    });
  }
}
