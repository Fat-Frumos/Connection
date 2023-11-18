import {createAction, props} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export const loadCustomCards =
  createAction('[Custom Card] Load Custom Cards');

export const saveCustomCards =
  createAction('[Custom Card] Save Custom Cards',
    props<{ customCards: CustomCard[] }>()
  );

export const addCustomCard =
  createAction('[Custom Card] Add Custom Card',
    props<{ customCard: CustomCard }>()
  );

export const deleteCustomCard =
  createAction('[CustomCard] Delete Custom Card',
    props<{ id: string }>()
  );
