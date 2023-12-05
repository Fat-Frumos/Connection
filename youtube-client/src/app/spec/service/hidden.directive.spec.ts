import { HiddenDirective } from '@app/shared/directives/hidden.directive';
import {expect, describe, beforeEach, it} from '@jest/globals';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

describe('HiddenDirective', () => {
  it('should create an instance', () => {
    const directive = new HiddenDirective();
    expect(directive).toBeTruthy();
  });
});

@Component({
  template: `
    <div appHidden #hiddenControl="hiddenControl"></div>
  `
})
class TestComponent {}

describe('HiddenDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiddenDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new HiddenDirective();
    expect(directive).toBeTruthy();
  });

  it('should bind to style.visibility with initial value "hidden"', () => {
    const elementRef = (fixture.debugElement.nativeElement as Element).querySelector('div') as HTMLDivElement;

    expect(elementRef.style.visibility).toBe('hidden');
  });

  it('should toggle visibility to "visible" when calling showResult', () => {
    const directive = fixture.debugElement.children[0].injector.get<HiddenDirective>(HiddenDirective);
    directive.showResult();

    const elementRef = (fixture.debugElement.nativeElement as Element).querySelector('div') as HTMLDivElement;

    expect(elementRef.style.visibility).toBe('hidden');
  });

  it('should toggle visibility between "hidden" and "visible" when calling toggle', () => {
    const directive = fixture.debugElement.children[0].injector.get<HiddenDirective>(HiddenDirective);
    directive.toggle();

    const elementRef = (fixture.debugElement.nativeElement as Element).querySelector('div') as HTMLDivElement;
    expect(elementRef.style.visibility).toBe('hidden');

    directive.toggle();
    expect(elementRef.style.visibility).toBe('hidden');
  });

  it('should set "visible" when toggle is called on an initially hidden directive', () => {
    const directive = fixture.debugElement.children[0].injector.get<HiddenDirective>(HiddenDirective);
    directive.toggle();
    const elementRef = (fixture.debugElement.nativeElement as Element).querySelector('div') as HTMLDivElement;
    expect(elementRef.style.visibility).toBe('hidden');
  });

  it('should set "hidden" when toggle is called on an initially visible directive', () => {
    const directive = fixture.debugElement.children[0].injector.get<HiddenDirective>(HiddenDirective);
    directive.toggle();
    directive.toggle();
    const elementRef = (fixture.debugElement.nativeElement as Element).querySelector('div') as HTMLDivElement;
    expect(elementRef.style.visibility).toBe('hidden');
  });
});
