import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {Conversation} from '@app/model/conversation/conversation.models';
import {RouterService} from '@app/auth/service/router.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {People} from '@app/model/user/user-profile-response.model';
import {Message} from '@app/model/message/message.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '@app/core/service/group.service';
import {MessageResponse} from '@app/model/message/message-response.models';
import {Group} from '@app/model/conversation/group.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ConversationComponent implements OnInit {

  users: BehaviorSubject<People[]> = new BehaviorSubject<People[]>([]);

  groups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);

  @Output() selectUser = new EventEmitter<People>();

  @Input() conversations: Conversation[] = [];

  @Input() selectedUserId: string = '';

  updateButtonText: string = 'Update';

  updateDisabled: boolean = false;

  isLoading = false;

  messages: Message[] = [];

  countdown: number = 0;

  groupID: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: GroupService,
    private router: RouterService) {
    this.updatePeopleList();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupID = params['id'] as string;
      this.loadMessages();
    });
    this.getGroups();
  }

  getGroups() {
    this.service.getGroups().subscribe(group =>
      this.groups.next(group.Items));
  }

  loadMessages(): void {
    this.service.getMessages(this.groupID).subscribe(
      (response: MessageResponse) => {
        this.messages = response.Items;
      });
  }

  private updateUsers() {
    this.isLoading = true;
    this.service.getPeople$().subscribe({
      next: (response) => {
        this.users.next(response.Items);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  deleteConversation(): void {
    const confirmDelete = confirm('Are you sure you want to delete this conversation?');
    if (confirmDelete) {
      this.service.deleteConversation(this.groupID).subscribe(() => {
        this.router.navigate(['/main']);
      });
    }
  }

  onSelectConversation(id: string): void {
    this.groupID = id;
    this.router.navigate(['/', 'group', id]);
  }

  updatePeopleList(): void {
    this.updateUsers();
    this.updatedConversations();
  }

  private updatedConversations() {
    this.service.getConversations$().subscribe(conversations => {
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
      this.conversations = conversations.Items;
    });
  }

  hasConversation(id: string): Observable<boolean> {
    return this.service.getPeople$().pipe(
      map(users => users.Items.some(user => user.uid.S === id))
    );
  }
}
