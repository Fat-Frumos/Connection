import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { ProfileComponent } from '@app/core/page/profile/profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {
  ActionsSubject,
  ReducerManager, ReducerManagerDispatcher,
  StateObservable,
  Store, StoreModule
} from '@ngrx/store';
import {UserReducer} from '@app/ngrx/user/user.reducer';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [ToastService, Store,
        StateObservable, ActionsSubject,
        ReducerManager, ReducerManagerDispatcher],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
