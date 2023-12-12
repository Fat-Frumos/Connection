import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {Observable, Subject, takeUntil} from 'rxjs';
import {ToastMessage} from '@app/model/toast-message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/auth/service/user.service';
import {ValidatorService} from '@app/auth/service/validator.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {Store} from '@ngrx/store';
import {updateProfile} from '@app/ngrx/profile/profile.actions';
import {ErrorMessage} from '@app/model/error-message.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  randomUserImage = 'https://picsum.photos/50/50/?random=1';

  profileData: UserProfileResponse = {} as UserProfileResponse;

  profileData$: Observable<UserProfileResponse>;

  private readonly unsubscribe$: Subject<void>;

  errorMessage$: Observable<ToastMessage>;

  currentUserName: string = '';

  isEditing = false;

  profileForm: FormGroup;

  constructor(
    private store: Store,
    private toast: ToastService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService) {
    this.unsubscribe$ = new Subject<void>();
    this.errorMessage$ = new Observable<ToastMessage>();
    this.profileForm = this.validator.getFormGroup(this.formBuilder);
    this.profileData$ = this.userService.fetchUser();
  }

  ngOnInit(): void {
    this.profileData$.pipe(takeUntil(this.unsubscribe$)).subscribe(profile => {
      this.profileData = profile;
      this.currentUserName = profile.name.S;
      this.profileForm = this.formBuilder.group({
        name: [this.currentUserName || '', [Validators.required.bind(Validators)]]
      });
    });
  }

  cancelEditing(): void {
    this.profileForm.reset({
      name: this.userService.getCurrentUser().name
    });
    this.profileForm.get('name')!.disable();
    this.isEditing = false;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const newName = (this.profileForm.value as UserProfileResponse).name.S;
      this.userService.update(newName).subscribe({
        next: (updatedProfile: UserProfileResponse) => {
          this.isEditing = false;
          this.toast.showMessage('Profile updated successfully', 'success');
          this.store.dispatch(updateProfile({ profile: updatedProfile }));
        },
        error: (error: ErrorMessage) => {
          this.toast.showMessage(`Failed to update profile: ${error.message}`, 'error');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
