import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from '@app/model/conversation/conversation.model';
import {RouterService} from '@app/auth/service/router.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ConversationService} from '@app/core/service/conversation.service';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {Message} from '@app/model/message/message.model';
import {ActivatedRoute} from '@angular/router';
import {
  ConversationResponse
} from '@app/model/conversation/conversation-response.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {

  conversationID: string;

  updateDisabled: boolean = false;

  countdown: number = 0;

  updateButtonText: string = 'Update';

  messages: Message[] = [];

  newMessage: string = '';

  @Input() conversations: Conversation[] = [];

  @Input() selectedUserId: string | undefined;

  @Output() selectUser = new EventEmitter<UserProfileResponse>();

  users: BehaviorSubject<UserProfileResponse[]> = new BehaviorSubject<UserProfileResponse[]>([]);

  currentPage = 0;

  pageSize = 8;

  isLoading = false;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private service: ConversationService,
    private router: RouterService) {
    this.conversationID = '';
    this.updatePeopleList();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.conversationID = params['conversationID'] as string;
      this.loadMessages();
    });
  }

  loadMessages(): void {
    this.service.getConversationMessages(this.conversationID).subscribe((response: ConversationResponse) => {
      this.messages = response.Items.find(
        conversation => conversation.conversationID === this.conversationID)?.messages ?? [];
    });
  }


  sendMessage(): void {
    this.service.sendMessage(this.conversationID, this.newMessage).subscribe(() => {
      this.loadMessages();
      this.newMessage = '';
    });
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

  updateConversation(): void {
    if (!this.updateDisabled) {
      this.countdown = 60;
      this.updateButtonText = 'Updating...';
      this.updateDisabled = true;

      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          this.updateButtonText = 'Update';
          this.updateDisabled = false;
          clearInterval(interval);
          this.loadMessages();
        }
      }, 1000);
    }
  }

  deleteConversation(): void {
    const confirmDelete = confirm('Are you sure you want to delete this conversation?');
    if (confirmDelete) {
      this.service.deleteConversation(this.conversationID).subscribe(() => {
        this.router.navigate(['/main']);
      });
    }
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

  onSelectConversation(uid: string): void {
    this.router.navigate(['/', 'conversation', uid]);
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
}
