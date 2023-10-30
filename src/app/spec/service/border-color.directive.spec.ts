import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BorderColorDirective } from '../../directive/border-color.directive';

@Component({
  template: `<div [appBorderColor]="dateValue" id="testDiv"></div>`
})
class TestComponent {
  dateValue!: string;
}

describe('BorderColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let directive: BorderColorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorderColorDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement.query(By.css('#testDiv'));
    directive = debugElement.injector.get(BorderColorDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set background color based on date', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    fixture.componentInstance.dateValue = date.toISOString();
    fixture.detectChanges();

    const nativeElement = debugElement.nativeElement as HTMLElement;
    const backgroundColor = nativeElement.style.backgroundColor;
    expect(backgroundColor).toBe('#EB5757');
  });
});
