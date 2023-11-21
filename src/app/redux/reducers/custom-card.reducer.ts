import {createReducer, on} from '@ngrx/store';
import {
  addCustomCard,
  deleteCustomCard,
  saveCustomCards
} from '@app/redux/actions/custom-card.action';
import {
  customCardAdapter,
  initialState
} from '@app/redux/states/custom-card.state';

export const CardsReducer =
  createReducer(
    initialState,
    on(
      addCustomCard,
      (state, action) => ({
        ...state,
        customCards: [...state.customCards, action.customCard]
      })
    ),
    on(
      saveCustomCards,
      (state, action) => ({
        ...state,
        youtubeCards: [...action.customCards]
      })
    ),
    on(saveCustomCards, (state, {customCards}) => {
      return customCardAdapter.setAll(customCards, state);
    }),
    on(addCustomCard, (state, {customCard}) => {
      return customCardAdapter.addOne(customCard, state);
    }),
    on(deleteCustomCard, (state, {id}) => {
      return customCardAdapter.removeOne(id, state);
    })
  );
