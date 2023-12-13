import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { GroupComponent } from '@app/core/component/group/group.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {
  ActionsSubject,
  ReducerManager, ReducerManagerDispatcher,
  StateObservable,
  Store, StoreModule
} from '@ngrx/store';
import {UserReducer} from '@app/ngrx/user/user.reducer';
import {GroupService} from '@app/core/service/group.service';

describe('ListComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupComponent],
      providers: [ToastService, Store, GroupService,
        StateObservable, ActionsSubject,
        ReducerManager, ReducerManagerDispatcher],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
