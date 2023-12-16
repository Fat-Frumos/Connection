import {AuthUser} from '@app/model/user/user-registration.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface UserState extends EntityState<AuthUser> {
  isDuplicate: boolean;
}

export const userAdapter = createEntityAdapter<AuthUser>();

export const initialUserState: UserState = userAdapter.getInitialState({
  isDuplicate: false
});
