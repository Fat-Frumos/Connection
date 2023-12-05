import {Component, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {FormService} from '@app/auth/services/form.service';

const MIN_LEN = 3;
const MAX_LEN = 255;
const MIDDLE_LEN = 20;
const TAGS_SIZE = 5;

@Component({
  selector: 'app-card-creation',
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardCreationComponent {

  textValidator = [Validators.required.bind(Validators),
    Validators.minLength(MIN_LEN), Validators.maxLength(MIDDLE_LEN)];

  public cardForm: FormGroup;

  constructor(
    private readonly service: VideoService,
    private readonly formService: FormService,
    private formBuilder: FormBuilder) {
    this.cardForm = this.formBuilder.group({
      title: ['', this.textValidator],
      description: ['', Validators.maxLength(MAX_LEN).bind(Validators)],
      imageLink: ['', Validators.required.bind(Validators)],
      videoLink: ['', Validators.required.bind(Validators)],
      creationDate: ['', [Validators.required.bind(Validators),
        this.formService.dateValidator.bind(this)]],
      tags: this.formBuilder.array([])
    });
  }

  get tags() {
    return this.cardForm.get('tags') as FormArray;
  }

  addTag(tag: string, input: HTMLInputElement): void {
    const alphanumericRegex = /^[0-9a-z]+$/;
    if (tag.trim() === '') {
      this.tags.setErrors({'empty': true});
    } else if (!alphanumericRegex.test(tag)) {
      this.tags.setErrors({'invalid': true});
    } else if (this.tags.length >= TAGS_SIZE) {
      this.tags.setErrors({'maxTags': true});
    } else {
      this.tags.push(this.formBuilder.control(tag,
        Validators.required.bind(Validators)));
      this.tags.setErrors(null);
      input.value = '';
    }
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onReset(): void {
    while (this.tags.length !== 0) {
      this.tags.removeAt(0);
    }
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

  getTitleErrorMessage(field: string): string {
    return this.formService.getTitleError(
      this.cardForm.get(field)?.errors, field);
  }

  getDateErrorMessage(): string {
    return this.formService.getDateError(
      this.cardForm.get('creationDate')?.errors);
  }

  getTagErrorMessage(): string {
    if (this.tags.hasError('maxTags')) {
      return 'You have reached the maximum number of tags.';
    }
    if (this.tags.hasError('empty')) {
      return 'Please enter a tag';
    }
    return '';
  }

  getErrorMessage(field: string): string {
    return this.formService.getErrorMessage(
      this.cardForm.get(field)?.errors, field);
  }
}
