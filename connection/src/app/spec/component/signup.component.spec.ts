import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {LoginComponent} from '@app/auth/page/login/login.component';
import {ActivatedRoute} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastService} from '@app/shared/component/toast/toast.service';

describe('SignupComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const activatedRouteStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule],
      providers: [ToastService,
        { provide: ActivatedRoute, useValue: activatedRouteStub }

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
