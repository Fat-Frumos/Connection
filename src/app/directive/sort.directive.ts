import {
  Directive,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective { //TODO Sorting by + input
  @Output() sort: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event.target.innerText'])
  onClick(sortBy: string): void {
    this.sort.emit(sortBy);
  }
}
