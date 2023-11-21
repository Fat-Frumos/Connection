import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Observable, Subscription, switchMap} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  addCustomCard,
  deleteCustomCard,
  loadCustomCards,
  saveCustomCards
} from '@app/redux/actions/custom-card.action';
import {
  selectAllCustomCards,
  selectCustomCardsByPage
} from '@app/redux/selectors/custom-card.selector';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {selectCurrentPage} from '@app/redux/selectors/pagination.selector';
import {setCurrentPage} from '@app/redux/actions/video-item.actions';
import {itemSize} from '@app/config';
import {VideoService} from '@app/youtube/services/video.service';
import {VideoItem} from '@app/youtube/models/video-item-model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  totalPages = 0;

  itemsPerPage = itemSize;

  currentPage$: Observable<number>;

  customCards$ = new Observable<CustomCard[]>();

  private videosSubscription: Subscription;

  constructor(
    private store: Store,
    private videoService: VideoService) {
    this.store.dispatch(loadCustomCards());
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));

    this.customCards$ = this.currentPage$.pipe(
      switchMap((page: number) =>
        this.store.pipe(select(selectCustomCardsByPage(page, this.itemsPerPage)))
      )
    );

    this.videosSubscription = this.videoService.videos$.subscribe((customCards: CustomCard[]) => {
      this.store.dispatch(saveCustomCards({customCards}));
    });

  }

  ngOnInit(): void {
    this.store.pipe(select(selectAllCustomCards))
      .subscribe((customCards: unknown): void => {
        const cards = customCards as CustomCard[];
        this.totalPages = Math.ceil(cards.length / this.itemsPerPage);
      });
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }

  toggleFavorite(videoId: string): void {
    this.store.dispatch(toggleFavorite({videoId}));
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
    return customCard.id.videoId;
  }

  saveDataAndRedirect(video: VideoItem): void {
    const customCard: CustomCard =
      {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        imageUrl: video.snippet.thumbnails.default.url,
        videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        creationDate: new Date(),
        statistics: video.statistics,
        snippet: video.snippet,
        publishedAt: video.snippet.publishedAt
      };
    this.store.dispatch(addCustomCard({customCard}));
  }
}
