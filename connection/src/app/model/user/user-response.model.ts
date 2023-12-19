import {People} from '@app/model/user/user-profile-response.model';

export interface PeopleResponse {
  Count: number;
  Items: People[];
}
