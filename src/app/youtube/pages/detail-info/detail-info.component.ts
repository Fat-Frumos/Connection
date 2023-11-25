import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {selectIsFavorite} from '@app/redux/selectors/favorite.selectors';
import {Observable} from 'rxjs';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent {

  @Input() data: CustomCard = {} as CustomCard;

  isFavorite$: Observable<boolean>;

  constructor(private store: Store) {
    this.isFavorite$ = this.store.select(selectIsFavorite(this.data.id.videoId));
  }

  toggleFavorite(videoId: string) {
    this.store.dispatch(toggleFavorite({ videoId }));
  }
}
