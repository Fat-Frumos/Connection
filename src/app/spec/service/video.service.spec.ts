import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {VideoService} from '@app/youtube/services/video.service';
import {
  CardCreationComponent
} from '@app/auth/pages/card-creation/card-creation.component';
import {FormService} from '@app/auth/services/form.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {customCards} from '@app/spec/interface/model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {StorageService} from '@app/youtube/services/storage.service';
import {SortService} from '@app/youtube/services/sort.service';
import {Store} from '@ngrx/store';

describe('VideoService', () => {
  let component: CardCreationComponent;
  let mockVideoService: jest.Mocked<VideoService>;
  let mockFormService: jest.Mocked<FormService>;
  let fixture: ComponentFixture<CardCreationComponent>;
  let httpMock: HttpTestingController;
  let mockStore: jest.Mocked<Store>;
  let mockStorageService: jest.Mocked<StorageService>;

  beforeEach(async () => {

    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn()
    } as unknown as jest.Mocked<Store>;

    mockStorageService = {
      saveVideo: jest.fn()
    } as unknown as jest.Mocked<StorageService>;

    mockVideoService = {
      _storage: mockStorageService,
      _videosSubject: {
        next: jest.fn()
      },
      videos$: of([]),
      updateVideos: jest.fn(),
      setSearchText: jest.fn(),
      save: jest.fn(),
      fetchCustomCards: jest.fn().mockReturnValue(of([]))
    } as unknown as jest.Mocked<VideoService>;

    const mockSortService = {
      store: mockStore,
      criteria$: jest.fn(),
      dateDirection: jest.fn(),
      viewDirection: jest.fn(),
      setCriteria$: jest.fn(),
      setSearchText$: jest.fn(),
      setDateDirection: jest.fn(),
      setViewDirection: jest.fn(),
      onSortDirection: jest.fn()
    };

    mockFormService = {
      dateValidator: jest.fn(),
      getTitleError: jest.fn(),
      getDateError: jest.fn(),
      getErrorMessage: jest.fn()
    } as unknown as jest.Mocked<FormService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CardCreationComponent],
      providers: [
        FormBuilder,
        {provide: StorageService, useValue: mockStorageService},
        {provide: SortService, useValue: mockSortService},
        {provide: VideoService, useValue: mockVideoService},
        {provide: FormService, useValue: mockFormService},
        {provide: Store, useValue: mockStore}
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CardCreationComponent);
    component = fixture.componentInstance;
    httpMock.verify();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update videos', () => {
    mockVideoService.updateVideos(customCards);
    mockVideoService.videos$.subscribe(videos => {
      expect(videos).toEqual(customCards);
    });
  });

  it('should update videos', () => {
    mockVideoService.updateVideos(customCards);
    mockVideoService.videos$.subscribe(videos => {
      expect(videos).toEqual(customCards);
    });
  });

  it('should add tag when addTag is called in component', () => {
    const tag = 'test';
    const input = document.createElement('input');
    component.addTag(tag, input);
    expect(component.tags.controls.length).toBe(1);
  });

  it('should remove tag when removeTag is called in component', () => {
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

  it('should call markAllAsTouched of form when onSubmit is called and form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.cardForm, 'markAllAsTouched');
    component.onSubmit();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should get tags controls when getTagsControls is called', () => {
    const tag = 'test';
    const input = document.createElement('input');
    component.addTag(tag, input);
    const controls = component.getTagsControls();
    expect(controls.length).toBe(1);
  });

  it('should get tag error message when getTagErrorMessage is called', () => {
    const tag = 'test';
    const input = document.createElement('input');
    for (let i = 0; i < 10; i++) {
      component.addTag(tag, input);
    }
    const errorMessage = component.getTagErrorMessage();
    expect(errorMessage).toBe('You have reached the maximum number of tags.');
  });


  it('should get title error message when getTitleErrorMessage is called', () => {
    const getTitleErrorSpy = jest.spyOn(mockFormService, 'getTitleError');
    component.getTitleErrorMessage('title');
    expect(getTitleErrorSpy).toHaveBeenCalled();
  });

  it('should get date error message when getDateErrorMessage is called', () => {
    const getDateErrorSpy = jest.spyOn(mockFormService, 'getDateError');
    component.getDateErrorMessage();
    expect(getDateErrorSpy).toHaveBeenCalled();
  });

  it('should call save of service when onSubmit is called and form is valid', () => {
    const saveSpy = jest.spyOn(mockVideoService, 'save');
    component.cardForm.controls['title'].setValue('test');
    component.cardForm.controls['description'].setValue('test');
    component.cardForm.controls['imageLink'].setValue('test');
    component.cardForm.controls['videoLink'].setValue('test');
    component.cardForm.controls['creationDate'].setValue('2024-01-01');
    component.onSubmit();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should get error message when getErrorMessage is called', () => {
    const getErrorMessageSpy = jest.spyOn(mockFormService, 'getErrorMessage');
    component.getErrorMessage('title');
    expect(getErrorMessageSpy).toHaveBeenCalled();
  });

  it('should update videos', () => {
    mockVideoService.updateVideos(customCards);
    mockVideoService.videos$.subscribe(videos => {
      expect(videos).toEqual(customCards);
    });
  });

  it('should fetch custom cards', (done) => {
    const search = 'test';
    mockVideoService.fetchCustomCards = jest.fn().mockReturnValue(of(customCards));
    mockVideoService.fetchCustomCards(search).subscribe(cards => {
      expect(cards).toEqual(customCards);
      done();
    });
  });
});
