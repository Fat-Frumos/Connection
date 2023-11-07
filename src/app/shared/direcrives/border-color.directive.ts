import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective implements OnInit {
  @Input() appBorderColor: string;

  private dayMs: number = 1000 * 60 * 60 * 24;

  private timeMap: { [key: string]: number } = {
    day: this.dayMs,
    week: this.dayMs * 7,
    month: this.dayMs * 30,
    halfYear: this.dayMs * 180
  };

  private colorMap: { [key: string]: string } = {
    'red': '#EB5757',
    'blue': '#2F80ED',
    'green': '#27AE60',
    'yellow': '#F2C94C'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.appBorderColor = '';
  }

  ngOnInit(): void {
    if (this.appBorderColor) {
      const currentDate = new Date();
      const publicationDate = new Date(this.appBorderColor);
      const timeDifference = currentDate.getTime() - publicationDate.getTime();

      let borderColor = '';

      if (timeDifference > this.timeMap['halfYear']) {
        borderColor = this.colorMap['red'];
      } else if (timeDifference >= this.timeMap['month']) {
        borderColor = this.colorMap['yellow'];
      } else if (timeDifference >= this.timeMap['week']) {
        borderColor = this.colorMap['green'];
      } else if (timeDifference >= this.timeMap['day']) {
        borderColor = this.colorMap['blue'];
      }
      this.renderer.setStyle(this.el.nativeElement, 'background', borderColor);
    }
  }
}
