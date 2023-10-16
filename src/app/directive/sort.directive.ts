import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Output() sort = new EventEmitter<string>();

  @HostListener('click', ['$event.currentTarget.className'])
  onClick(className: string) {
    this.sort.emit(className);
  }
}
