import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SearchService {

  search = new BehaviorSubject<string>('');

  public searchText$ = this.search.asObservable();

  setSearchText(text: string) {
    this.search.next(text);
  }
}
