import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileResponse} from '@app/model/profile-response.model';
import {ProfileService} from '@app/core/service/profile.service';
import {Observable, Subject} from 'rxjs';
import {ToastMessage} from '@app/model/toast-message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '@app/ngrx/app/app.state';
import {UserService} from '@app/auth/service/user.service';
import {Store} from '@ngrx/store';
import {
  updateProfile,
  updateProfileFailed
} from '@app/ngrx/profile/profile.actions';
import {ValidatorService} from '@app/auth/service/validator.service';
import {ToastService} from '@app/shared/component/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void>;

  profileData = {} as ProfileResponse;

  errorMessage$: Observable<ToastMessage>;

  currentUserName: string = '';

  isEditing = false;

  profileForm: FormGroup;

  randomUserImage: string;

  getRandomUserImage(): string {
    return `https://source.unsplash.com/random/400x400/?woman`;
  }

  constructor(
    private toast: ToastService,
    private store: Store<AppState>,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService,
    private profileService: ProfileService) {
    this.unsubscribe$ = new Subject<void>();
    this.errorMessage$ = new Observable<ToastMessage>();
    this.randomUserImage = this.getRandomUserImage();
    this.profileForm = this.validator.getFormGroup(this.formBuilder);
  }

  ngOnInit(): void {
    this.profileService.profileData$.subscribe(profile => {
      this.profileData = profile;
    });
    this.currentUserName = this.userService.getCurrentUser().name;
    this.profileForm = this.formBuilder.group({
      name: [this.userService.getCurrentUser().name, [Validators.required.bind(Validators)]]
    });
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  cancelEditing() {
    this.profileForm.reset({
      name: this.userService.getCurrentUser().name
    });
    this.isEditing = false;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const newName = (this.profileForm.value as ProfileResponse).name.S;
      this.store.dispatch(updateProfile({name: newName}));
      this.isEditing = false;
      this.toast.show('Profile updated successfully', 'success');
    } else {
      this.store.dispatch(updateProfileFailed());
      this.toast.show('Invalid form data', 'error');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
