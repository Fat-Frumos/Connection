import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {Observable, Subject, takeUntil} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {
  selectAllCustomCards,
  selectAllVideos
} from '@app/redux/selectors/custom-card.selector';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {loadVideos} from '@app/redux/actions/video-item.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  @Input() videos: VideoItem[] = [];

  customCards$: Observable<CustomCard[]>;

  constructor(private store: Store) {
    this.customCards$ = this.store.pipe(select(selectAllCustomCards));
  }

  ngOnInit(): void {
    this.store.dispatch(loadVideos());
    this.store.pipe(select(selectAllVideos), takeUntil(this.unsubscribe$))
      .subscribe(videoItems => {
        this.videos = videoItems;
        console.log(videoItems);
      });
  }

  toggleFavorite(videoId: string): void {
    this.store.dispatch(toggleFavorite({videoId}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
