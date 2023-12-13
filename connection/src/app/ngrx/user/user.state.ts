import {AuthUser} from '@app/model/user/user-registration.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface UserModel extends EntityState<AuthUser> {
  isDuplicate: boolean;
}

export const userAdapter = createEntityAdapter<AuthUser>();

export const initialUserState: UserModel = userAdapter.getInitialState({
  isDuplicate: false
});
