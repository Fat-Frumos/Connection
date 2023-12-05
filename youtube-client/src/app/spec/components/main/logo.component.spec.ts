import { ComponentFixture, TestBed } from '@angular/core/testing';
import {expect, describe, beforeEach, it} from '@jest/globals';
import { LogoComponent } from '@app/core/components/header/logo/logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent]
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
