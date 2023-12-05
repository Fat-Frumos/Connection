import {createAction, props} from '@ngrx/store';

export const showAlert =
  createAction('[App] show alert',
    props<{ message: string, resultType: string; }>());

export const emptyAction =
  createAction('[App] empty');
