import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoComponent } from '../../../youtube/pages/detail-info/detail-info.component';

describe('DetailInfoComponent', () => {
  let component: DetailInfoComponent;
  let fixture: ComponentFixture<DetailInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailInfoComponent]
    });
    fixture = TestBed.createComponent(DetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
