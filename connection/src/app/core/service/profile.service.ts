import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ProfileResponse} from '@app/model/profile-response.model';
import {HttpStatusService} from '@app/auth/service/http-status.service';
import {ToastMessage} from '@app/model/toast-message.model';
import {UserService} from '@app/auth/service/user.service';
import {ToastService} from '@app/shared/component/toast/toast.service';

@Injectable()
export class ProfileService {

  private _profileData$ = new Observable<ProfileResponse>();

  constructor(
    private toast: ToastService,
    private service: UserService
  ) {
    this.fetch();
  }

  get profileData$(): Observable<ProfileResponse> {
    return this._profileData$;
  }

  updateProfile(name: string): Observable<ProfileResponse> {
    return this.service.update(name);
  }

  private handleError(error: HttpErrorResponse): void {
    const toastMessage: ToastMessage = this.getErrorMessage(error);
    this.toast.show(toastMessage.message, toastMessage.toastType);
  }

  private getErrorMessage(error: HttpErrorResponse): ToastMessage {
    return HttpStatusService.getStatus(error.status, error.statusText);
  }

  private fetch(): void {
    this._profileData$ = this.service.fetchUser();
  }
}
