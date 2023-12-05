import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {
  CustomCardComponent
} from '@app/youtube/components/custom-card/custom-card.component';

class MockStore {
}

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardComponent],
      providers: [
        {provide: Store, useClass: MockStore}
      ]
    });
    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
