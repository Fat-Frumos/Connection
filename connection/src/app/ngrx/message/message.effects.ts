import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  updateMessage,
  updateMessageFailure,
  updateMessageSuccess
} from '@app/ngrx/message/message.actions';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MessageService} from '@app/core/service/message.service';

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private messageService: MessageService) {
    console.log(this.loadMessages$);
  }

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap(() =>
        this.messageService.getMessages().pipe(
          map((messages) => loadMessagesSuccess({messages})),
          catchError((error) => of(loadMessagesFailure({
            error: error instanceof Error ? error.message : 'Unknown error'
          })))
        )
      )
    )
  );

  updateMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMessage),
      switchMap(({message}) =>
        this.messageService.updateMessage(message).pipe(
          map((updatedMessage) =>
            updateMessageSuccess({message: updatedMessage})),
          catchError((error) => of(updateMessageFailure({
            error: error instanceof Error ? error.message : 'Unknown error'
          })))
        )
      )
    )
  );
}
