import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/youtube/models/video-list-response-model';
import {baseUrl, searchUrl} from '@app/config';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {SortService} from '@app/youtube/services/sort.service';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';

@Injectable()
export class VideoService implements OnDestroy {

  private videosSubject: BehaviorSubject<VideoItem[]>;

  private _videos$: Observable<VideoItem[]>;

  private subscription$: Subscription;

  constructor(
    private http: HttpClient,
    private readonly _sortService: SortService
  ) {
    this.videosSubject = new BehaviorSubject<VideoItem[]>([]);
    this._videos$ = this.videosSubject.asObservable();
    this.subscription$ = new Subscription();
    this.fetchVideoData();
    this.searchText$.subscribe(searchText => {
      this.searchVideos(searchText).subscribe((response: YoutubeResponse) => {
        const videos: VideoItem[] = response.items;
        this.videosSubject.next(videos);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.videosSubject.unsubscribe();
  }

  private fetchVideoData(): void {
    this.subscription$.add(
      this.http.get<VideoListResponse>(`${baseUrl}&part=snippet,statistics`)
        .subscribe((data: VideoListResponse): void =>
          this.videosSubject.next(data.items)
        )
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
    return this.http.get<VideoItem>(`${baseUrl}?id=${itemId}&part=snippet,statistics`);
  }

  searchVideos(value: string): Observable<YoutubeResponse> {
    const uri = `${searchUrl}?type=video&part=snippet&maxResults=15&q=${value}`;
    return this.http.get<YoutubeResponse>(uri);
  }
}
