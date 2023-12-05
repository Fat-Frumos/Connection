import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {SortService} from '@app/youtube/services/sort.service';
import {StorageService} from '@app/youtube/services/storage.service';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {saveCustomCards} from '@app/redux/actions/custom-card.action';
import {baseUrl} from '@app/config';
import {VideoListResponse} from '@app/youtube/models/video-list-response-model';

@Injectable()
export class VideoService {

  private _videosSubject: BehaviorSubject<CustomCard[]> = new BehaviorSubject<CustomCard[]>([]);

  constructor(
    private store: Store,
    private http: HttpClient,
    private _sortService: SortService,
    private _storage: StorageService
  ) {
    this.fetchCustomCards('').subscribe(value => {
      this._videosSubject.next(value);
    });
  }

  get videos$(): Observable<CustomCard[]> {
    return this._videosSubject.asObservable();
  }

  updateVideos(customCards: CustomCard[]) {
    this._videosSubject.next(customCards);
  }

  setSearchText(searchText: string): void {
    this._sortService.setCriteria$(searchText);
  }

  save(data: VideoItem): void {
    this._storage.saveVideo(data);
  }

  fetchCustomCards(search: string): Observable<CustomCard[]> {
    return this.findByCriteria(search).pipe(
      switchMap((response: YoutubeResponse) => {
        const items: CustomCard[] = response.items;
        return this.getCustomCardStatistics(
          items.map(item => item.id.videoId)).pipe(
          map((statisticsResponse: VideoListResponse) => {
            return items.map((item: CustomCard, index: number) => {
              item.statistics = statisticsResponse.items[index].statistics;
              return item;
            });
          })
        );
      }),
      tap((customCards: CustomCard[]): void => {
        this._videosSubject.next(customCards);
        this.store.dispatch(saveCustomCards({customCards: customCards}));
      })
    );
  }

  private findByCriteria(value: string): Observable<YoutubeResponse> {
    return this.http.get<YoutubeResponse>(baseUrl + '/search', {
      params: {
        part: 'snippet',
        maxResults: '20',
        q: value,
        type: 'video'
      }
    });
  }

  public getCustomCardStatistics(ids: string[]): Observable<VideoListResponse> {
    return this.http.get<VideoListResponse>(`${baseUrl}/videos?`,
      {
        params: {
          part: 'statistics',
          id: ids.join(',')
        }
      });
  }
}
