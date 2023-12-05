import {User} from '@app/model/user.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface UserModel extends EntityState<User> {
  isDuplicate: boolean;
}

export const userAdapter = createEntityAdapter<User>();

export const initialUserState: UserModel = userAdapter.getInitialState({
  isDuplicate: false
});
