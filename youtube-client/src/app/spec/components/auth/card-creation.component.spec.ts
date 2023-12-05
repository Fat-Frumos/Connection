import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {
  CardCreationComponent
} from '@app/auth/pages/card-creation/card-creation.component';
import {VideoService} from '@app/youtube/services/video.service';
import {FormService} from '@app/auth/services/form.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

describe('CardCreationComponent', () => {
  let component: CardCreationComponent;
  let fixture: ComponentFixture<CardCreationComponent>;
  let mockVideoService: jest.Mocked<VideoService>;
  let mockFormService;

  beforeEach(async () => {
    mockVideoService = {
      save: jest.fn(),
      videos$: of([]),
      updateVideos: jest.fn(),
      setSearchText: jest.fn(),
      fetchCustomCards: jest.fn().mockReturnValue(of([]))
    } as unknown as jest.Mocked<VideoService>;


    mockFormService = {
      dateValidator: jest.fn(),
      getTitleError: jest.fn(),
      getDateError: jest.fn(),
      getErrorMessage: jest.fn()
    } as unknown as jest.Mocked<FormService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CardCreationComponent],
      providers: [
        FormBuilder,
        {provide: VideoService, useValue: mockVideoService},
        {provide: FormService, useValue: mockFormService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add tag when addTag is called', () => {
    const tag = 'test';
    const input = document.createElement('input');
    component.addTag(tag, input);
    expect(component.tags.controls.length).toBe(1);
  });

  it('should remove tag when removeTag is called', () => {
    const tag = 'test';
    const input = document.createElement('input');
    component.addTag(tag, input);
    component.removeTag(0);
    expect(component.tags.controls.length).toBe(0);
  });

  it('should reset tags when onReset is called', () => {
    const tag = 'test';
    const input = document.createElement('input');
    component.addTag(tag, input);
    component.onReset();
    expect(component.tags.controls.length).toBe(0);
  });

  it('should call save of service when onSubmit is called and form is valid', () => {
    const saveSpy = jest.spyOn(mockVideoService, 'save');
    component.cardForm.controls['title'].setValue('test component');
    component.cardForm.controls['description'].setValue('test component');
    component.cardForm.controls['imageLink'].setValue('test');
    component.cardForm.controls['videoLink'].setValue('test');
    component.cardForm.controls['creationDate'].setValue('2024-01-01');
    component.onSubmit();
    expect(saveSpy).toHaveBeenCalled();
  });
});
