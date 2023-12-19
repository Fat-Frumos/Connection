import {Component, OnDestroy, OnInit} from '@angular/core';
import {People} from '@app/model/user/user-profile-response.model';
import {EMPTY, Observable, Subject, takeUntil, tap} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/auth/service/user.service';
import {ValidatorService} from '@app/auth/service/validator.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {catchError} from 'rxjs/operators';
import {AuthUser} from '@app/model/user/user-registration.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  randomUserImage = 'https://picsum.photos/50/50/?random=1';

  profileData$ = new Observable<People>();

  private readonly unsubscribe$: Subject<void>;

  currentUserName: string = '';

  isEditing = false;

  profileForm: FormGroup;

  constructor(
    private toast: ToastService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService) {
    this.unsubscribe$ = new Subject<void>();
    this.profileForm = this.formBuilder.group({name: ['', [this.validator.nameValidator]]});
    this.currentUserName = this.userService.getCurrentUser().name.S;
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.profileData$ = this.userService.fetchUser();
  }

  private loadUserProfile() {
    this.profileData$.pipe(takeUntil(this.unsubscribe$)).subscribe(profile => {
      this.profileForm.setValue({
        name: profile.name.S
      });
      this.currentUserName = profile.name.S;
      this.profileForm = this.formBuilder.group({
        name: [this.currentUserName || '', [Validators.required.bind(Validators)]]
      });
    });
  }

  cancelEditing(): void {
    this.profileForm.reset({name: this.currentUserName});
    this.profileForm.get('name')!.disable();
    this.isEditing = false;
  }


  saveChanges() {
    if (this.profileForm.valid) {
      const newName = this.profileForm.value as AuthUser;
      this.userService.update(newName).pipe(
        tap((name) => {
          this.currentUserName = name.name;
          this.isEditing = false;
          this.toast.showMessage('Profile updated successfully', 'success');
          localStorage.setItem('name', this.currentUserName);
        }),
        catchError((error: ErrorMessage) => {
          console.error(error);
          this.toast.showMessage(`Failed to update profile: ${error.message}`, 'error');
          return EMPTY;
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
