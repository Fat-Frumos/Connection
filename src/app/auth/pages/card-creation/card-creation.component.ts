import {Component, ViewEncapsulation} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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

  cardForm = this.fb.group({
    title: ['', [Validators.required.bind(Validators),
      Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255).bind(Validators)],
    imageLink: ['', Validators.required.bind(Validators)],
    videoLink: ['', Validators.required.bind(Validators)],
    creationDate: ['', [Validators.required.bind(Validators),
      this.dateValidator.bind(this)]],
    tags: this.fb.array([
      this.fb.control('', Validators.required.bind(Validators))
    ])
  });

  constructor(
    private readonly service: VideoService,
    private fb: FormBuilder) {
    console.log();
  }

  get tags() {
    return this.cardForm.get('tags') as FormArray;
  }

  addTag = () => {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.control('',
        Validators.required.bind(Validators)));
    }
  };


  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  resetForm() {
    while (this.tags.length !== 1) {
      this.tags.removeAt(0);
    }
    this.cardForm.reset();
  }

  dateValidator(control: FormControl): ValidationErrors | null {
    const date = new Date(control.value as string | number | Date);
    const now = new Date();
    return date > now ? {futureDate: true} : null;
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const cardData = this.cardForm.value as VideoItem;
      this.service.save(cardData);
    } else {
      this.cardForm.markAllAsTouched();
    }
  }
}
