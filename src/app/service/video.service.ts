import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/interface/video-list-response-model';
import {baseUrl} from '@app/config';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/interface/video-item-model';
import {BorderColorDirective} from '@app/directive/border-color.directive';
import {SortDirection} from '@app/interface/sort-direction';

@Injectable()
export class VideoService implements OnDestroy {

  private videosSubject: BehaviorSubject<VideoItem[]>;

  private subscription$: Subscription = new Subscription();

  public videos$: Observable<VideoItem[]>;

  private directionDate: SortDirection = SortDirection.DEFAULT;

  private directionView: SortDirection = SortDirection.DEFAULT;

  constructor(
    private http: HttpClient,
    private readonly color: BorderColorDirective) {
    this.fetchVideoData();
    this.videosSubject = new BehaviorSubject<VideoItem[]>([]);
    this.videos$ = this.videosSubject.asObservable();
  }

  public getAllVideos(): VideoItem[] {
    let videos: VideoItem[] = [];
    this.videos$.subscribe(
      (video: VideoItem[]): void => {
        videos = video;
      });
    return videos;
  }

  private fetchVideoData(): void {
    this.subscription$.add(
      this.http.get<VideoListResponse>(baseUrl)
        .subscribe((data: VideoListResponse): void => {
          data.items.forEach((item: VideoItem): void => {
            item.color = this.color.colorized(item.snippet.publishedAt);
          });
          this.videosSubject.next(data.items);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getVideos$(): Observable<VideoItem[]> {
    return this.videos$;
  }

  onSort(criteria: string): VideoItem[] {
    const videos: VideoItem[] = this.getAllVideos();
    const sortStrategies: { [key: string]: (items: VideoItem[]) => VideoItem[] } = {
      'date': (items) => this.sortByDate(items),
      'count of views': (items) => this.sortByViews(items),
      'sort input field': (items) => this.onFilter(items, criteria)
    };

    const sortStrategy = sortStrategies[criteria as keyof typeof sortStrategies];
    if (sortStrategy) {
      return sortStrategy(videos);
    }
    return videos;
  }

  private sortByDate(videos: VideoItem[]): VideoItem[] {
    this.directionDate = this.toggleDirection(this.directionDate);
    return videos.sort((a: VideoItem, b: VideoItem): number => {
      return this.orderBy(
        new Date(a.snippet.publishedAt).getTime(),
        new Date(b.snippet.publishedAt).getTime(),
        this.directionDate);
    });
  }

  private sortByViews(videos: VideoItem[]): VideoItem[] {
    this.directionView = this.toggleDirection(this.directionView);
    return videos.sort((a: VideoItem, b: VideoItem): number => {
      return this.orderBy(
        a.statistics.viewCount,
        b.statistics.viewCount,
        this.directionView);
    });
  }

  onFilter(videos: VideoItem[], search: string): VideoItem[] {
    return !search ? videos
      : videos.filter((video: VideoItem) =>
        video.snippet.title.toLowerCase()
          .includes(search.toLowerCase())
      );
  }

  private toggleDirection(direction: SortDirection): SortDirection {
    return direction.valueOf() === 1
      ? SortDirection.ASC
      : SortDirection.DESC;
  }

  private orderBy(a: number, b: number, direction: SortDirection): number {
    return direction.valueOf() === 0 ? a - b : b - a;
  }

  filterBy(searchText: string): void {
    this.onFilter(this.getAllVideos(), searchText);
  }

  sortBy(criteria: string): void {
    this.onSort(criteria);
  }
}
