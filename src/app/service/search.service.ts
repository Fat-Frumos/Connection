import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SearchService {

  public search: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public searchText$: Observable<string> = this.search.asObservable();

  public setSearchText(text: string): void {
    this.search.next(text);
  }
}
