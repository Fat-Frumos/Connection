import {Component, Input} from '@angular/core';
import {Message} from '@app/model/conversation/message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() message: Message = {} as Message;

  @Input() user: UserProfileResponse = {} as UserProfileResponse;

  @Input() currentUser: UserProfileResponse = {} as UserProfileResponse;

}
