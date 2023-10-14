import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/interface/video-list-response-model';
import {baseUrl} from '@app/config';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/interface/video-item-model';

@Injectable()
export class VideoService implements OnDestroy {

  private videosSubject:BehaviorSubject<VideoItem[]> = new BehaviorSubject<VideoItem[]>([]);

  private colors: string[] = ['#EB5757', '#2F80ED', '#27AE60', '#F2C94C'];

  private subscription$: Subscription = new Subscription();

  public videos$: Observable<VideoItem[]> = this.videosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchVideoData();
  }

  private fetchVideoData(): void {
    this.subscription$.add(
      this.http.get<VideoListResponse>(baseUrl)
        .subscribe((data: VideoListResponse): void => {
          data.items.forEach((item: VideoItem): void => {
            item.color = this.getRandomColor();
          });
          this.videosSubject.next(data.items);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
