import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/youtube/models/video-list-response-model';
import {baseUrl} from '@app/config';
import {BehaviorSubject, map, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {SortService} from '@app/youtube/services/sort.service';
import {StorageService} from '@app/youtube/services/storage.service';

@Injectable()
export class VideoService implements OnDestroy {

  private videosSubject: BehaviorSubject<VideoItem[]>;

  private readonly _videos$: Observable<VideoItem[]>;

  private subscription$: Subscription;

  constructor(
    private http: HttpClient,
    private readonly _sortService: SortService,
    private readonly storage: StorageService
  ) {
    this.videosSubject = new BehaviorSubject<VideoItem[]>([]);
    this._videos$ = this.videosSubject.asObservable();
    this.subscription$ = new Subscription();
    this.fetchVideoData();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private fetchVideoData(): void {
    this.subscription$.add(
      this.http.get<VideoListResponse>(baseUrl)
        .subscribe((data: VideoListResponse): void => {
          this.videosSubject.next(data.items);
        })
    );
  }

  get sortService(): SortService {
    return this._sortService;
  }

  get videos$(): Observable<VideoItem[]> {
    return this._videos$;
  }

  get searchText$(): Observable<string> {
    return this._sortService.criteria$.asObservable();
  }

  setSearchText(searchText: string): void {
    this._sortService.setCriteria$(searchText);
  }

  getById(itemId: string): Observable<VideoItem | undefined> {
    return this._videos$.pipe(
      map((videos) => videos.find((video) => video.id === itemId))
    );
  }

  save(data: VideoItem) {
    this.storage.saveVideo(data);
  }
}
