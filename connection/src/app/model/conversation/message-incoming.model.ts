import {User} from '@app/model/user/user.model';

export interface IncomingMessage {
  recipient: User;
  sender: User;
}
