import {Component, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl, FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {VideoItem} from '@app/youtube/models/video-item-model';

@Component({
  selector: 'app-card-creation',
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardCreationComponent {

  cardForm = this.formBuilder.group({
    title: ['', [Validators.required.bind(Validators),
      Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255).bind(Validators)],
    imageLink: ['', Validators.required.bind(Validators)],
    videoLink: ['', Validators.required.bind(Validators)],
    creationDate: ['', [Validators.required.bind(Validators),
      this.dateValidator.bind(this)]],
    tags: this.formBuilder.array([this.formBuilder.control('',
      Validators.required.bind(Validators))])
  });

  constructor(
    private readonly service: VideoService,
    private formBuilder: FormBuilder) {
    console.log();
  }

  get tags() {
    return this.cardForm.get('tags') as FormArray;
  }

  createTag(): FormGroup {
    return this.formBuilder.group({
      tag: ['', Validators.required.bind(Validators)]
    });
  }

  addTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  onReset(): void {
    this.cardForm.reset();
    while (this.tags.length !== 1) {
      this.tags.removeAt(0);
    }
  }

  dateValidator(control: FormControl): ValidationErrors | null {
    return new Date(control.value as string | number | Date) >
    new Date() ? {futureDate: true} : null;
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.service.save(this.cardForm.value as VideoItem);
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  getTagsControls(): AbstractControl[] {
    return this.tags.controls;
  }

  getTitleErrorMessage(): string {
    if (this.cardForm.get('title')?.errors?.['required']) {
      return 'Please enter a title';
    }
    if (this.cardForm.get('title')?.errors?.['minlength']) {
      return 'The title is too short';
    }
    if (this.cardForm.get('title')?.errors?.['maxlength']) {
      return 'The title is too long';
    }
    return '';
  }

  getDateErrorMessage(): string {
    if (this.cardForm.get('creationDate')?.errors?.['required']) {
      return 'Please enter a creation date';
    }
    if (this.cardForm.get('creationDate')?.errors?.['invalidDate']) {
      return 'The date is invalid';
    }
    return '';
  }

  getTagErrorMessage(index: number): string {
    return (this.cardForm.get('tags') as FormArray)
      .at(index).get('tag')?.errors?.['required']
      ? 'Please enter a tag' : '';
  }

  getDescriptionMessage(): string {
    return this.cardForm.get('description')?.errors?.['maxlength']
      ? 'The description is too long' : '';
  }

  getImageMessage(): string {
    return this.cardForm.get('imageLink')?.errors?.['required']
      ? 'Please enter a link to the image' : '';
  }

  getVideoMessage(): string {
    return this.cardForm.get('videoLink')?.errors?.['required']
      ? 'Please enter a link to the video' : '';
  }
}
