import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { FormMessageComponent } from '@app/auth/component/form-message/form-message.component';

describe('FormMessageComponent', () => {
  let component: FormMessageComponent;
  let fixture: ComponentFixture<FormMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
