import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {map, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  mapperVideoItemToCard,
  selectAllCustomCards
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

  @Input() videos: VideoItem[] = [];

  videos$: Observable<CustomCard[]>;

  constructor(
    private store: Store) {
    this.videos$ = this.store.select(selectAllCustomCards).pipe(
      map((customCards) =>
        customCards.concat(
          this.videos.map((video) => mapperVideoItemToCard(video))
        )
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadCustomCards());
  }
}
