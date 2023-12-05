import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {AppComponent} from '@app/app.component';
import {FooterComponent} from '@app/core/components/footer/footer.component';
import {HeaderComponent} from '@app/core/components/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionsSubject, StateObservable, Store, StoreModule} from '@ngrx/store';
import {SortService} from '@app/youtube/services/sort.service';
import {StorageService} from '@app/youtube/services/storage.service';
import {VideoService} from '@app/youtube/services/video.service';
import {HttpClientModule} from '@angular/common/http';
import {HiddenDirective} from '@app/shared/directives/hidden.directive';
import {
  LoginInfoComponent
} from '@app/core/components/header/login-info/login-info.component';
import {
  SettingsButtonComponent
} from '@app/core/components/header/settings-button/settings-button.component';
import {LogoComponent} from '@app/core/components/header/logo/logo.component';
import {
  FilterSettingComponent
} from '@app/core/components/header/filter-setting/filter-setting.component';
import {LoginService} from '@app/auth/services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FilterSettingComponent,
        LogoComponent,
        SettingsButtonComponent,
        LoginInfoComponent,
        HiddenDirective,
        AppComponent,
        FooterComponent,
        HeaderComponent],
      providers: [
        Store,
        VideoService,
        SortService,
        LoginService,
        StorageService,
        StateObservable,
        ActionsSubject],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'podcast'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('podcast');
  });

  it(`should have as title 'podcast'`, () => {
    expect(component.title).toEqual('podcast');
  });
});
