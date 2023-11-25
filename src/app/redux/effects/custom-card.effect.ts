import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {
  addCustomCard, deleteCustomCard,
  loadCustomCards,
  saveCustomCards
} from '@app/redux/actions/custom-card.action';
import {CustomCardService} from '@app/youtube/services/custom-card.service';

@Injectable()
export class CustomCardEffect {

  loadCustomCards$ = createEffect(() =>
    this.actions$.pipe(ofType(loadCustomCards),
      mergeMap(() => this.customCardService.getCustomCards()
        .pipe(map(customCards => saveCustomCards({customCards})),
          catchError(() => of({type: '[Custom Card API] Cards Loaded Error'}))
        )
      ))
  );

  addCustomCard$ = createEffect(() =>
    this.actions$.pipe(ofType(addCustomCard),
      tap(action =>
        this.customCardService.saveCustomCard(action.customCard))
    ), {dispatch: false});

  deleteCustomCard$ =
    createEffect(() => this.actions$.pipe(ofType(deleteCustomCard),
      tap(action =>
        this.customCardService.deleteCard(action.id))
    ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private customCardService: CustomCardService) {
    console.log('Features');
  }
}
