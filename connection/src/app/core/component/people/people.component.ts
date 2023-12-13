import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {ConversationService} from '@app/core/service/conversation.service';
import {AppState} from '@app/ngrx/app/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Conversation} from '@app/model/conversation/conversation.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PeopleComponent implements OnInit {

  users: UserProfileResponse[];

  people$: Observable<UserProfileResponse[]>;

  isLoading = false;

  canUpdate = true;

  countdown = 0;

  currentUser = {} as UserProfileResponse;

  conversations: Conversation[] = [];

  constructor(
    private store: Store<AppState>,
    private service: ConversationService) {
    this.users = [];
    this.people$ = store.select(state => state.people);
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
    this.service.getUsers().subscribe(people => {
      this.users = people.Items;
    });
  }

  updatePeople(): void {
    if (this.canUpdate) {
      this.isLoading = true;
      this.service.getUsers().subscribe(() => {
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

  createConversation(id: string) {
    this.service.createConversation(id).subscribe(() => {
      this.loadPeople();
      const conversationExists = this.service.checkConversation(id);
      if (!conversationExists) {
        this.service.createConversation(id);
      }
    });
  }
}
