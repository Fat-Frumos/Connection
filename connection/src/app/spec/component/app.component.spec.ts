import {TestBed} from '@angular/core/testing';
import {expect, it} from '@jest/globals';
import {AppComponent} from '@app/app.component';

it('should create the app', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app).toBeTruthy();
});

it(`should have as title 'angular-server'`, () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app.title).toEqual('angular-server');
});
