import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {VideoService} from '@app/youtube/services/video.service';
import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';
import {Observable, Subscription} from 'rxjs';
import {fetchUser} from '@app/redux/actions/user.actions';
import {SortService} from '@app/youtube/services/sort.service';
import {itemSize} from '@app/config';
import {selectCurrentPage} from '@app/redux/selectors/pagination.selector';
import {setCurrentPage} from '@app/redux/actions/custom-card.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {

  totalPages = 0;

  itemsPerPage = itemSize;

  currentPage$: Observable<number>;

  criteria = '';

  searchText = '';

  sortField: CriteriaModel;

  videos$: Observable<CustomCard[]>;

  private subscriptions: Subscription [];

  constructor(
    private service: VideoService,
    private sortService: SortService,
    private store: Store
  ) {
    this.subscriptions = [];
    this.videos$ = this.service.videos$;
    // this.videos$ = this.store.select(selectAllCustomCards);
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.sortField = {order: Direction.ASC, field: SortField.DATE};
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUser());

    this.subscriptions.push(
      this.sortService.searchText$.subscribe((searchText) => {
        this.searchText = searchText;
      }),
      this.sortService.sortFields$.subscribe((sortField) => {
        this.sortField = sortField;
      }),
      this.sortService.criteria$.subscribe((criteria) => {
        this.criteria = criteria;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe());
  }

  changePage(newPage: number): void {
    this.store.dispatch(setCurrentPage({currentPage: newPage}));
  }
}
