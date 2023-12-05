import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BorderColorDirective } from '@app/shared/directives/border-color.directive';
import {expect, describe, beforeEach, it} from '@jest/globals';

@Component({
  template: `<div [appBorderColor]='dateValue' id='testDiv'></div>`
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

  function rgbToHex(rgb: string): string {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      return '';
    }
    function hex(x: string) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
  }

  it('should set background color based on date', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    fixture.componentInstance.dateValue = date.toISOString();
    fixture.detectChanges();

    const nativeElement = debugElement.nativeElement as HTMLElement;
    const backgroundColor = rgbToHex(nativeElement.style.backgroundColor);
    expect(backgroundColor).toBe('#2f80ed');
  });
});
