import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {
  FavoriteComponent
} from '@app/auth/pages/favorite/components/favorite.component';


class MockStore {
  select() {
    return of([]);
  }
}

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      providers: [
        {provide: Store, useClass: MockStore}
      ]
    });
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
