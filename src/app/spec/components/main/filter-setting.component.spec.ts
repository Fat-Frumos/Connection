import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  FilterSettingComponent
} from '@app/youtube/components/filter-setting/filter-setting.component';

describe('DropdownSettingComponent', () => {
  let component: FilterSettingComponent;
  let fixture: ComponentFixture<FilterSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSettingComponent]
    });
    fixture = TestBed.createComponent(FilterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
