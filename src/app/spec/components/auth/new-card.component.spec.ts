import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardComponent } from '../../../auth/pages/new-card/new-card.component';

describe('NewCardComponent', () => {
  let component: NewCardComponent;
  let fixture: ComponentFixture<NewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCardComponent]
    });
    fixture = TestBed.createComponent(NewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
