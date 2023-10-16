import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective { //TODO Sorting by + input
  @Output() sort: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event.currentTarget.className'])
  onClick(className: string): void {
    this.sort.emit(className);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.sort.emit();
    console.log(value);
  }
}
