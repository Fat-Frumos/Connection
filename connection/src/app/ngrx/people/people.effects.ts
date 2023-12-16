import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {
  loadPeople,
  loadPeopleFailure,
  loadPeopleSuccess
} from '@app/ngrx/people/people.action';
import {ConversationService} from '@app/core/service/conversation.service';
import {UserResponse} from '@app/model/user/user-response.model';

@Injectable()
export class PeopleEffects {
  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(() =>
        this.peopleService.getUsers$().pipe(
          map((user: UserResponse) => user.Items),
          map((people) => loadPeopleSuccess({ people })),
          catchError((error) => of(loadPeopleFailure({
            error: error instanceof Error ? error.message : 'Unknown error'
          })))
        )
      )
    )
  );


  constructor(private actions$: Actions, private peopleService: ConversationService) {
    console.log(this.loadPeople$);
  }
}
