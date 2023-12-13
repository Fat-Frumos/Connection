import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {NavbarComponent} from '@app/shared/component/navbar/navbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {
  ActionsSubject,
  ReducerManager, ReducerManagerDispatcher,
  StateObservable,
  Store, StoreModule
} from '@ngrx/store';
import {UserReducer} from '@app/ngrx/user/user.reducer';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [ToastService, Store,
        StateObservable, ActionsSubject,
        ReducerManager, ReducerManagerDispatcher],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
