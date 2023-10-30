import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appHidden]',
  exportAs: 'hiddenControl'
})
export class HiddenDirective {

  @HostBinding('style.visibility')
  public visibility: 'visible' | 'hidden' = 'hidden';

  public showResult(): void {
    this.visibility = 'visible';
  }

  public toggle(): void {
    this.visibility =
      this.visibility === 'hidden'
        ? 'visible'
        : 'hidden';
  }
}
