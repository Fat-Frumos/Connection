import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/youtube/models/video-list-response-model';
import {baseUrl, itemSize, keyApi, urlApi} from '@app/config';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {SortService} from '@app/youtube/services/sort.service';
import {StorageService} from '@app/youtube/services/storage.service';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';
import {map} from 'rxjs/operators';

@Injectable()
export class VideoService implements OnDestroy {

  private _videosSubject: BehaviorSubject<VideoItem[]>;

  private readonly _videos$: Observable<VideoItem[]>;

  private subscription$: Subscription;

  constructor(
    private http: HttpClient,
    private _sortService: SortService,
    private _storage: StorageService
  ) {
    this._videosSubject = new BehaviorSubject<VideoItem[]>([]);
    this._videos$ = this._videosSubject.asObservable();
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
          this._videosSubject.next(data.items);
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
      map((videos) =>
        videos.find((video) =>
          video.id.videoId === itemId))
    );
  }

  save(data: VideoItem): void {
    this._storage.saveVideo(data);
  }

  findByCriteria(value: string): Observable<YoutubeResponse> {
    const url = `${urlApi}?part=snippet&maxResults=${itemSize}&q=${value}&key=${keyApi}`;
    return this.http.get<YoutubeResponse>(url);
  }

  updateVideos(videoItems: VideoItem[]) {
    this._videosSubject.next(videoItems);
    console.log(videoItems);
  }
}
