import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {finalize, Observable, Subject} from 'rxjs';
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
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileData: UserProfileResponse = {} as UserProfileResponse;

  profileData$: Observable<UserProfileResponse>;

  private readonly unsubscribe$: Subject<void>;

  errorMessage$: Observable<ToastMessage>;

  isLoggingOut = false;

  currentUserName: string = '';

  isEditing = false;

  randomUserImage: string;

  profileForm: FormGroup;

  getRandomUserImage(): string {
    return `https://source.unsplash.com/random/400x400/?woman`;
  }

  constructor(
    private toast: ToastService,
    private store: Store<AppState>,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService) {
    this.unsubscribe$ = new Subject<void>();
    this.errorMessage$ = new Observable<ToastMessage>();
    this.profileForm = this.validator.getFormGroup(this.formBuilder);
    this.profileData$ = this.userService.fetchUser();
    this.randomUserImage = this.getRandomUserImage();
  }

  ngOnInit(): void {
    this.profileData$.subscribe(profile => {
      this.profileData = profile;
    });

    this.currentUserName = this.userService.getCurrentUser().name;
    this.profileForm = this.formBuilder.group({
      name: [this.userService.getCurrentUser().name, [Validators.required.bind(Validators)]]
    });
  }

  cancelEditing() {
    this.profileForm.reset({
      name: this.userService.getCurrentUser().name
    });
    this.isEditing = false;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const newName = (this.profileForm.value as UserProfileResponse).name.S;
      this.store.dispatch(updateProfile({name: newName}));
      this.isEditing = false;
      this.toast.showMessage('Profile updated successfully', 'success');
    } else {
      this.store.dispatch(updateProfileFailed());
      this.toast.showMessage('Invalid form data', 'error');
    }
  }

  logout(): void {
    this.isLoggingOut = true;
    this.userService.logout().pipe(
      finalize(() => {
        this.isLoggingOut = false;
      })
    ).pipe(
      catchError((error) => {
        this.isLoggingOut = false;
        this.toast.showMessage('Logout failed', 'error');
        throw error;
      })
    ).subscribe({
      next: () => {
        this.toast.showMessage('Logout successful', 'success');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
