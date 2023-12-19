import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {
  loadPeople,
  loadPeopleFailure,
  loadPeopleSuccess
} from '@app/ngrx/people/people.action';
import {GroupService} from '@app/core/service/group.service';
import {PeopleResponse} from '@app/model/user/user-response.model';

@Injectable()
export class PeopleEffects {
  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPeople),
      switchMap(() =>
        this.peopleService.getPeople$().pipe(
          map((user: PeopleResponse) => user.Items),
          map((people) => loadPeopleSuccess({people})),
          catchError((error) => of(loadPeopleFailure({
            error: error instanceof Error ? error.message : 'Unknown error'
          })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private peopleService: GroupService) {
    console.log(this.loadPeople$);
  }
}
