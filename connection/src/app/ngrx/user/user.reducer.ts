import {Action, createReducer, on} from '@ngrx/store';
import {
  userAdapter,
  UserState,
  initialUserState
} from '@app/ngrx/user/user.state';
import {
  duplicateUserSuccess,
  getUsersSuccess
} from '@app/ngrx/user/user.actions';

const userReducer = createReducer(
  initialUserState,
  on(duplicateUserSuccess, (state, action) => {
    return {
      ...state,
      isDuplicate: action.isDuplicate
    };
  }),
  on(getUsersSuccess, (state, {userList}) => {
    return {
      ...state,
      ...userAdapter.setAll(userList, state)
    };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return userReducer(state ?? initialUserState, action);
}
