import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaginationComponent } from '@app/auth/components/pagination/pagination.component';
import { expect, describe, beforeEach, it } from '@jest/globals';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentPage based on the provided observable', () => {
    const currentPage$ = of(3);
    component.currentPage$ = currentPage$;

    fixture.detectChanges();

    expect(component.currentPage).toBe(3);
  });

  it('should emit pageChange event when changePage is called with a valid page', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    const validPage = 2;

    component.changePage(validPage);

    expect(pageChangeSpy).toHaveBeenCalledWith(validPage);
  });

  it('should not emit pageChange event when changePage is called with an invalid page', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    const invalidPage = 0;

    component.changePage(invalidPage);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });
});
