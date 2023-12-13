import {createAction, props} from '@ngrx/store';
import {ToastMessage} from '@app/model/toast-message.model';

export const showAlert =
  createAction('[App Toast] show alert',
    props<{ message: string, resultType: string; }>());

export const emptyAction =
  createAction('[App Toast] empty');

export const showToast =
  createAction('[App Toast] Show Toast',
    props<{ toast: ToastMessage }>());

export const clearToast =
  createAction('[App Toast] Clear Toast');
