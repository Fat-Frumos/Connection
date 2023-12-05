import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrl: './form-message.component.scss'
})
export class FormMessageComponent {

  @Input() formGroup: FormGroup = {} as FormGroup;

}
