import {Directive} from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective {

  private colorMap: { [key: string]: string } = {
    'red': '#EB5757',
    'blue': '#2F80ED',
    'green': '#27AE60',
    'yellow': '#F2C94C'
  };

  private dayMs: number = 1000 * 60 * 60 * 24;

  private timeMap: { [key: string]: number } = {
    day: this.dayMs,
    week: this.dayMs * 7,
    month: this.dayMs * 30,
    halfYear: this.dayMs * 180
  };

  colorized(date: string): string {
    return this.getColor(new Date(date));
  }

  private getColor(date: Date): string { //TODO BorderColorDirective factory
    const currentDate: Date = new Date();
    const itemDate: Date = new Date(date);
    const diffTime: number = Math.abs(currentDate.getTime() - itemDate.getTime());
    const diffDays: number = Math.ceil(diffTime / this.timeMap['day']);

    if (diffDays < this.timeMap['week']) {
      return this.colorMap['red'];
    } else if (diffDays < this.timeMap['month']) {
      return this.colorMap['blue'];
    } else if (diffDays < this.timeMap['halfYear']) {
      return this.colorMap['green'];
    } else {
      return this.colorMap['yellow'];
    }
  }
}
