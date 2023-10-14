import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSettingComponent } from './dropdown-setting.component';

describe('DropdownSettingComponent', () => {
  let component: DropdownSettingComponent;
  let fixture: ComponentFixture<DropdownSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSettingComponent]
    });
    fixture = TestBed.createComponent(DropdownSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
