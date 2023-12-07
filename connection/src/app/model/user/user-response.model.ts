import {User} from '@app/model/user/user.model';

export interface UserResponse {
  Count: number;
  Items: User[];
}
