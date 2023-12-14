import {Component, OnDestroy} from '@angular/core';
import {
  SelectedConversation
} from '@app/model/conversation/selected-conversation.model';
import {Conversation} from '@app/model/conversation/conversation.model';
import {UserService} from '@app/auth/service/user.service';
import {SendRequestMessage} from '@app/model/message/send-request-message.model';
import {RouterService} from '@app/auth/service/router.service';
import {ConversationService} from '@app/core/service/conversation.service';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {

  conversations: Conversation[] = [];

  private readonly subscription: Subscription;

  selectedConversation: SelectedConversation;

  currentUser: UserProfileResponse = this.userService.getCurrentUser();

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private routerService: RouterService
  ) {
    this.subscription = this.conversationService.getConversations$().subscribe(
      conversations => {
        this.conversations = conversations.Items;
      });
    this.selectedConversation = {} as SelectedConversation;
  }

  onPostMessage(message: SendRequestMessage) {
    this.selectedConversation?.messages.push({
      recipient: message.recipient,
      sender: this.currentUser?.email.S,
      createdAt: new Date().toISOString(),
      message: message.message,
      authorID: '123345'
    });
  }

  onSelectUser(user: UserProfileResponse) {
    this.currentUser = user;
    this.routerService.navigate(['/', 'conversation', user.name.S]);
  }

  isLoaded(): boolean {
    return false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
