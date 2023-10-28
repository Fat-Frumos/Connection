import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  SettingsButtonComponent
} from '@app/components/backoffice/header/settings-button/settings-button.component';

describe('SettingsButtonComponent', () => {
  let component: SettingsButtonComponent;
  let fixture: ComponentFixture<SettingsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsButtonComponent]
    });
    fixture = TestBed.createComponent(SettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
