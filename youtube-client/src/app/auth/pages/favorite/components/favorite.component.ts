import {Component} from '@angular/core';
import {selectFavoriteVideos} from '@app/redux/selectors/favorite.selectors';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  favoriteVideos$: Observable<CustomCard[]>;

  constructor(private store: Store) {
    this.favoriteVideos$ = this.store.select(selectFavoriteVideos);
  }

  toggleFavorite(videoId: string): void {
    this.store.dispatch(toggleFavorite({videoId}));
  }
}
