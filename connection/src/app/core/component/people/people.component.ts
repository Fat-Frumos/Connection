import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {People} from '@app/model/user/user-profile-response.model';
import {Conversation} from '@app/model/conversation/conversation.models';
import {GroupService} from '@app/core/service/group.service';
import {RouterService} from '@app/auth/service/router.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PeopleComponent implements OnInit {

  users: People[];

  isLoading = false;

  canUpdate = true;

  countdown = 0;

  conversations: Conversation[] = [];

  constructor(
    private router: RouterService,
    private service: GroupService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.loadPeople();
    this.loadConversations();
  }

  loadConversations(): void {
    this.service.getConversations$().subscribe(conversations => {
      this.conversations = conversations.Items;
    });
  }

  loadPeople(): void {
    this.service.getPeople$().subscribe(people => {
      this.users = people.Items;
    });
  }

  updatePeople(): void {
    if (this.canUpdate) {
      this.isLoading = true;
      this.service.getPeople$().subscribe(() => {
        this.loadPeople();
        this.isLoading = false;
        this.canUpdate = false;
        this.countdown = 60;
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(interval);
            this.canUpdate = true;
          }
        }, 1000);
      });
    }
  }

  createConversation(uid: string) {
    if (this.service.conversations && this.conversations.length > 0) {
      const conversation = this.conversations.find(
        (item: Conversation) => item.id.S === uid) ?? null;
      if (conversation) {
        this.router.navigate(['conversation', conversation.id.S]);
      } else {
        this.create(uid);
      }
    } else {
      this.create(uid);
    }
    this.router.navigate(['conversation', uid]);
  }

  private create(uid: string) {
    this.service.createConversation(uid).subscribe(conversationId => {
      this.service.currentConversationId = conversationId.conversationID;
      localStorage.setItem('cid', conversationId.conversationID);
    });
  }

  hasConversation(id: string): boolean {
    return this.conversations.some(conversation =>
      conversation.id.S === id);
  }
}
