import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';

@Injectable()
export class SortService {

  private readonly _criteria$: Subject<string>;

  public sortFields$: Subject<CriteriaModel>;

  private _dateCriteria: CriteriaModel;

  private _viewCriteria: CriteriaModel;

  public searchText$: Subject<string>;

  constructor() {
    this._dateCriteria = {field: SortField.DATE, order: Direction.ASC};
    this._viewCriteria = {field: SortField.VIEW, order: Direction.ASC};
    this._criteria$ = new BehaviorSubject<string>('');
    this.sortFields$ = new Subject<CriteriaModel>();
    this.searchText$ = new Subject<string>();
  }

  get criteria$(): Subject<string> {
    return this._criteria$;
  }

  get dateDirection(): Direction {
    return this._dateCriteria.order;
  }

  get viewDirection(): Direction {
    return this._viewCriteria.order;
  }

  setCriteria$(value: string) {
    this._criteria$.next(value);
  }

  setSearchText$(value: string): void {
    this.searchText$.next(value);
  }

  setDateDirection(value: Direction): void {
    this._dateCriteria = {field: SortField.DATE, order: value};
    this.sortFields$.next(this._dateCriteria);
  }

  setViewDirection(value: Direction): void {
    this._viewCriteria = {field: SortField.VIEW, order: value};
    this.sortFields$.next(this._viewCriteria);
  }

  onSortDirection(field: string): void {
    if (field === 'date') {
      this.setDateDirection(this.toggle(this.dateDirection));
    } else if (field === 'view') {
      this.setViewDirection(this.toggle(this.viewDirection));
    }
  }

  private toggle(order: Direction): Direction {
    return order === Direction.DESC
      ? Direction.ASC : Direction.DESC;
  }
}
