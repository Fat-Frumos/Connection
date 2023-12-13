import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  SelectedConversation
} from '@app/model/conversation/selected-conversation.model';
import {Message} from '@app/model/conversation/message.model';
import {MessageSendRequest} from '@app/model/conversation/message-send-request';
import {ConversationService} from '@app/core/service/conversation.service';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  @Input() selectedConversation: SelectedConversation;

  @Input() currentUser: UserProfileResponse;

  @Output() postMessage = new EventEmitter<MessageSendRequest>();

  newMessage: string;

  constructor(private chatService: ConversationService) {
    this.newMessage = '';
    this.currentUser = {} as UserProfileResponse;
    this.selectedConversation = {} as SelectedConversation;
  }

  getUser(message: Message) {
    return this.selectedConversation?.participants.find(
      user => user.uid.S === message.authorID) ?? this.currentUser;
  }

  onPostMessage() {
    //   this.postMessage.emit({
    //     message: this.newMessage,
    //     recipient: this.selectedConversation?.participants[1].uid || ''
    //   });
    //   this.chatService.sendMessage(
    //     this.selectedConversation?.participants[1].uid || '', this.newMessage).pipe(
    //     take(1)).subscribe();
  }
}
