import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {Store} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Observable} from 'rxjs';
import {selectIsFavorite} from '@app/redux/selectors/favorite.selectors';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchItemComponent implements OnInit {

  @Input() video: CustomCard;

  isFavorite$: Observable<boolean>;

  constructor(
    private store: Store) {
    this.video = {} as CustomCard;
    this.isFavorite$ = new Observable<boolean>();
  }

  ngOnInit(): void {
    if (this.video.id) {
      this.isFavorite$ = this.store.select(selectIsFavorite(this.video.id.videoId));
    }
  }

  toggleFavorite(id: string): void {
    this.store.dispatch(toggleFavorite({videoId: id}));
  }
}
