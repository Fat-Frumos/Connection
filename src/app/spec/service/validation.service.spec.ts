import { TestBed } from '@angular/core/testing';
import {expect, describe, beforeEach, it} from '@jest/globals';
import { FormService } from '@app/auth/services/form.service';
import {FormControl} from '@angular/forms';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email', () => {
    const control = new FormControl('test@example.com');
    expect(service.emailValidator(control)).toBeNull();

    control.setValue('invalidEmail');
    expect(service.emailValidator(control)).toEqual({invalidUsername: true});
  });

  it('should validate date', () => {
    const control = new FormControl(new Date());
    expect(service.dateValidator(control)).toBeNull();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    control.setValue(futureDate);
    expect(service.dateValidator(control)).toEqual({futureDate: true});
  });

  it('should validate password', () => {
    const control = new FormControl('Test@123');
    expect(service.passwordValidator(control)).toBeNull();

    control.setValue('weak password');
    expect(service.passwordValidator(control)).toEqual({weakPassword: true});
  });

  it('should get title error message', () => {
    expect(service.getTitleError({required: true}, 'title')).toBe('Please enter a title');
    expect(service.getTitleError({minlength: true}, 'title')).toBe('The title is too short');
    expect(service.getTitleError({maxlength: true}, 'title')).toBe('The title is too long');
    expect(service.getTitleError(null, 'title')).toBe('');
  });

  it('should get date error message', () => {
    expect(service.getDateError({required: true})).toBe('Please enter a creation date');
    expect(service.getDateError({invalidDate: true})).toBe('The date is invalid');
    expect(service.getDateError(null)).toBe('');
  });

  it('should get error message', () => {
    expect(service.getErrorMessage({required: true}, 'field')).toBe('Please enter a field');
    expect(service.getErrorMessage(null, 'field')).toBe('');
  });
});
