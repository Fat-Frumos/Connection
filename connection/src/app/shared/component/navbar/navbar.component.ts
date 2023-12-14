import {Component, inject, ViewEncapsulation} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {UserService} from '@app/auth/service/user.service';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {

  userService: UserService = inject(UserService);

  toast: ToastService = inject(ToastService);

  logout(): void {
    this.userService.logout().pipe(
      catchError((error: ErrorMessage) => {
        this.toast.showMessage(`Logout failed${error.message}`, 'error');
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.toast.showMessage('Logout successful', 'success');
      }
    });
  }
}
