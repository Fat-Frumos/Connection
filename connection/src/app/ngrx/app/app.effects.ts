import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  clearToast,
  emptyAction,
  showAlert,
  showToast
} from '@app/ngrx/app/app.action';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {tap} from 'rxjs';
import {Store} from '@ngrx/store';

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private toast: ToastService, private store: Store) {
    console.log(this.showAlert$);
  }

  showAlert$ =
    createEffect(() =>
      this.action$.pipe(
        ofType(showAlert),
        tap((action) => {
          this.toast.showMessage(action.message, 'warning');
          this.store.dispatch(emptyAction());
        })
      ), {dispatch: false}
    );

  showToast$ =
    createEffect(() =>
      this.action$.pipe(ofType(showToast),
        tap((action) => {
          this.toast.show(action.toast);
        })
      )
    );

  clearToast$ =
    createEffect(() =>
      this.action$.pipe(
        ofType(clearToast),
        tap(() => {
          this.toast.clear();
        })));
}
