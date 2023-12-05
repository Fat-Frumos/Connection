import {createAction, props} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

const actionSource = '[Custom Card]';

export const fetchResult =
  createAction(`${actionSource} Load Search Result`,
    props<{ result: string }>());

export const fetchVideosFailure =
  createAction(`${actionSource} Load Videos Failure`,
    props<{ error: string }>());

export const fetchCustomCardsSuccess =
  createAction(`${actionSource} Load Videos Success`,
    props<{ customCards: CustomCard[] }>());

export const fetchCustomCardSuccess =
  createAction(`${actionSource} Load Video Success`,
    props<{ customCards: CustomCard }>());


export const loadCustomCards =
  createAction(`${actionSource} Load Custom Cards`);

export const saveCustomCards =
  createAction(`${actionSource}  Save Custom Cards`,
    props<{ customCards: CustomCard[] }>()
  );

export const addCustomCard =
  createAction(`${actionSource}  Add Custom Card`,
    props<{ customCard: CustomCard }>()
  );

export const deleteCustomCard =
  createAction(`${actionSource}  Delete Custom Card`,
    props<{ id: string }>()
  );

export const setCurrentPage =
  createAction('[Video] Set Current Page',
    props<{ currentPage: number }>());
