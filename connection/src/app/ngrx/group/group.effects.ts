import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GroupService} from '@app/core/service/group.service';
import {Injectable} from '@angular/core';
import {
  loadGroups,
  loadGroupsFailure,
  loadGroupsSuccess
} from '@app/ngrx/group/group.actions';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {GroupResponse} from '@app/model/conversation/group-response.model';
import {Group} from '@app/model/conversation/group.model';

@Injectable()
export class GroupEffects {

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroups),
      switchMap(() =>
        this.groupService.getGroups().pipe(
          map((groupResponse: GroupResponse) => {
            const transformedGroups: Group[] = groupResponse.Items.map(group => ({
              id: {S: group.id.S},
              name: {S: group.name.S},
              createdAt: {S: group.createdAt.S},
              createdBy: {S: group.createdBy.S},
              isOwned: group.isOwned
            }));
            return loadGroupsSuccess({groups: transformedGroups});
          }),
          catchError(error => of(loadGroupsFailure({
            error: error instanceof Error ? error.message : 'Unknown error'
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {
    console.log(this.loadGroups$);
  }
}
