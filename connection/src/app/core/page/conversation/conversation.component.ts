import {Component} from '@angular/core';
import {Conversation} from '@app/model/conversation/conversation.model';
import {RouterService} from '@app/auth/service/router.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/error-message.model';
import {User} from '@app/model/user/user.model';
import {Observable, of, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ConversationService} from '@app/core/service/conversation.service';

@Component({
  selector: 'app-conversation-people',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {

  users: User[] = [];

  conversations: Conversation[] = [];

  constructor(
    private toast: ToastService,
    private service: ConversationService,
    private router: RouterService) {
    this.updatePeopleList();
  }

  updatePeopleList(): void {
    this.service.getUsers().subscribe(users => {
      this.users = users.Items;
    });

    this.service.getConversations().subscribe(conversations => {
      this.conversations = conversations.Items;
    });
  }

  hasConversation(id: string): Observable<boolean> {
    return this.service.getUsers().pipe(
      map(users => users.Items.some(user => user.uid === id))
    );
  }

  redirectToConversation(companionID: string): void {
    if (!this.conversations.find(c => c.companionID === companionID)) {
      this.service.createConversation(companionID).pipe(
        tap(() => {
          this.router.navigate(['/group']);
        }),
        catchError((error: ErrorMessage) => {
          this.toast.showMessage(error.message, 'error');
          return of(null);
        })
      ).subscribe();
    } else {
      this.router.navigate(['/conversation']);
    }
  }
}
