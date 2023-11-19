import {Component, Input} from '@angular/core';
import {VideoDataModel} from '@app/youtube/models/video-data-model';
import {Store} from '@ngrx/store';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {selectIsFavorite} from '@app/redux/selectors/favorite.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent {

  @Input() data: VideoDataModel = {} as VideoDataModel;

  isFavorite$: Observable<boolean>;

  constructor(private store: Store) {
    this.isFavorite$ = this.store.select(selectIsFavorite(this.data.id));
  }

  toggleFavorite(id: string) {
    this.store.dispatch(toggleFavorite({videoId: id}));
  }
}
