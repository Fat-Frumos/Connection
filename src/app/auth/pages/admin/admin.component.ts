import {Component, OnInit} from '@angular/core';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Observable, switchMap} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  addCustomCard, deleteCustomCard,
  loadCustomCards
} from '@app/redux/actions/custom-card.action';
import {
  selectAllCustomCards,
  selectCustomCardsByPage
} from '@app/redux/selectors/custom-card.selector';
import {selectCurrentPage} from '@app/redux/selectors/pagination.selector';
import {setCurrentPage} from '@app/redux/actions/video.actions';
import {itemSize} from '@app/config';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  totalPages = 0;

  itemsPerPage = itemSize;

  currentPage$: Observable<number>;

  customCards$ = new Observable<CustomCard[]>();

  constructor(private store: Store) {
    this.store.dispatch(loadCustomCards());
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.customCards$ = this.currentPage$.pipe(
      switchMap((page: number) =>
        this.store.pipe(select(selectCustomCardsByPage(page, this.itemsPerPage)))
      )
    );
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAllCustomCards))
      .subscribe((customCards: unknown): void => {
        const cards = customCards as CustomCard[];
        this.totalPages = Math.ceil(cards.length / this.itemsPerPage);
      });
  }

  addCustomCard(customCard: CustomCard): void {
    this.store.dispatch(addCustomCard({customCard}));
  }

  deleteCustomCard(id: string): void {
    this.store.dispatch(deleteCustomCard({id}));
  }

  changePage(newPage: number): void {
    this.store.dispatch(setCurrentPage({currentPage: newPage}));
  }

  trackByCustomCard(_index: number, customCard: CustomCard): string {
    return customCard.id;
  }
}
