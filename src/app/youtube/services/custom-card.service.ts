import {Injectable} from '@angular/core';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectAllCustomCards} from '@app/redux/selectors/custom-card.selector';

@Injectable()
export class CustomCardService {

  customCards$: Observable<CustomCard[]>;

  constructor(private store: Store) {
    this.customCards$ = this.store.pipe(select(selectAllCustomCards));
  }

  deleteCard(id: string) {
    this.store.dispatch({type: '[Custom Card] Delete', payload: id});
  }

  getCustomCards(): Observable<CustomCard[]> {
    return this.customCards$;
  }

  saveCustomCard(card: CustomCard): void {
    this.store.dispatch({type: '[Custom Card] Add', payload: card});
  }
}
