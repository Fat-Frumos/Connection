import {Directive} from '@angular/core';

@Directive({
  selector: '[appHidden]'
})
export class HiddenDirective {

  isSubmitted = false;

}
