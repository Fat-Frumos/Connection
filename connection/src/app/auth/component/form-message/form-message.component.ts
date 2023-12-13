import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrl: './form-message.component.scss'
})
export class FormMessageComponent {

  @Input() formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
}
