import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MatSnackBar} from '@angular/material/snack-bar';
import {exhaustMap, map} from 'rxjs/operators';
import {emptyAction, showAlert} from '@app/ngrx/app/app.action';

@Injectable()
export class AppEffects {
  constructor(private $action: Actions, private _snackbar: MatSnackBar) {
    console.log(this.showAlert);
  }

  showAlert = createEffect(() =>
    this.$action.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showNackBarAlert(action.message, action.resultType).afterDismissed().pipe(
          map(() => {
            return emptyAction();
          })
        );
      })
    )
  );

  showNackBarAlert(message: string, resultType: string = 'fail') {
    const _class = resultType === 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class]
    });
  }
}
