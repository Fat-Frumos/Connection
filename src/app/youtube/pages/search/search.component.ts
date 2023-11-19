import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {
  selectAllCustomCards,
  selectAllVideos
} from '@app/redux/selectors/custom-card.selector';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {loadCustomCards} from '@app/redux/actions/custom-card.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  videos$: Subscription;

  @Input() videos: VideoItem[] = [];

  customCards$: Observable<CustomCard[]>;

  constructor(
    private store: Store) {
    this.customCards$ = this.store.pipe(select(selectAllCustomCards));
    this.videos$ = this.store.pipe(select(selectAllVideos))
      .subscribe(videoItems => {
        this.videos = videoItems;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadCustomCards());
  }

  toggleFavorite(videoId: string): void {
    this.store.dispatch(toggleFavorite({videoId}));
  }
}
