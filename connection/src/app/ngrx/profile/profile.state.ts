import {ProfileState} from '@app/ngrx/profile/profile.reducer';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';
import {ErrorMessage} from '@app/model/message/error-message.model';

export const initialProfileState: ProfileState = {
  name: '',
  profile: {} as UserProfileResponse,
  error: {} as ErrorMessage
};
