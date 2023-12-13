import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {MainComponent} from '@app/core/page/main/main.component';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ActionsSubject, StateObservable, Store, StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserReducer} from '@app/ngrx/user/user.reducer';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [ToastService, Store,
        StateObservable, ActionsSubject],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
