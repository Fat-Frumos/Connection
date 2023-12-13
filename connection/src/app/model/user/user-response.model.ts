import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface UserResponse {
  Count: number;
  Items: UserProfileResponse[];
}
