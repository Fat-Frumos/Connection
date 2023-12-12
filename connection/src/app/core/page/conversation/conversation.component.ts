import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Conversation} from '@app/model/conversation/conversation.model';
import {RouterService} from '@app/auth/service/router.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/error-message.model';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ConversationService} from '@app/core/service/conversation.service';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {

  @Input() conversations: Conversation[] = [];

  @Input() selectedUserId: string | undefined;

  @Output() selectUser = new EventEmitter<UserProfileResponse>();

  users: BehaviorSubject<UserProfileResponse[]> = new BehaviorSubject<UserProfileResponse[]>([]);

  currentPage = 0;

  pageSize = 8;

  isLoading = false;

  constructor(
    private toast: ToastService,
    private service: ConversationService,
    private router: RouterService) {
    this.updatePeopleList();
  }

  private updateUsers() {
    this.isLoading = true;
    this.service.getUsers().subscribe({
      next: (response) => {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const usersToDisplay = response.Items.slice(startIndex, endIndex);
        this.users.next(usersToDisplay);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  nextPage() {
    this.currentPage++;
    this.updateUsers();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateUsers();
    }
  }

  onSelectConversation(item: Conversation): void { //TODO
    this.router.navigate(['/', 'conversation', item.participants[0].uid.S]);
  }

  updatePeopleList(): void {
    this.updateUsers();
    this.updatedConversations();
  }

  private updatedConversations() {
    this.service.getConversations$().subscribe(conversations => {
      this.conversations = conversations.Items;
      console.log(this.conversations);
    });
  }

  hasConversation(id: string): Observable<boolean> {
    return this.service.getUsers().pipe(
      map(users => users.Items.some(user => user.uid.S === id))
    );
  }

  redirectToConversation(companionID: string): void {
    if (!this.conversations.find(conversation => conversation.participants[1].uid.S === companionID)) {
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

  startChat(user: UserProfileResponse) {
    this.router.navigate(['chat', user.uid.S]);
  }
}
