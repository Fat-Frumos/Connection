import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '@app/ngrx/app/app.state';
import {profileReducer} from '@app/ngrx/profile/profile.reducer';
import {UserReducer} from '@app/ngrx/user/user.reducer';
import {messageReducer} from '@app/ngrx/message/message.reducer';
import {groupReducer} from '@app/ngrx/group/group.reducer';
import {peopleReducer} from '@app/ngrx/people/people.reducer';

export const reducers: ActionReducerMap<AppState> = {
  people: peopleReducer,
  profile: profileReducer,
  messages: messageReducer,
  groups: groupReducer,
  user: UserReducer
};
