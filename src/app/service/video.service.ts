import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/interface/video-list-response-model';
import {baseUrl} from '@app/config';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/interface/video-item-model';

@Injectable()
export class VideoService implements OnDestroy {

  private videosSubject: BehaviorSubject<VideoItem[]>;

  private subscription$: Subscription = new Subscription();

  public videos$: Observable<VideoItem[]>;

  private colorMap: { [key: string]: string } = {
    'red': '#EB5757',
    'blue': '#2F80ED',
    'green': '#27AE60',
    'yellow': '#F2C94C'
  };

  private dayMs: number = 1000 * 60 * 60 * 24;

  private timeMap: { [key: string]: number } = {
    day: this.dayMs,
    week: this.dayMs * 7,
    month: this.dayMs * 30,
    halfYear: this.dayMs * 180
  };

  constructor(private http: HttpClient) {
    this.fetchVideoData();
    this.videosSubject = new BehaviorSubject<VideoItem[]>([]);
    this.videos$ = this.videosSubject.asObservable();
  }

  private fetchVideoData(): void {
    this.subscription$.add(
      this.http.get<VideoListResponse>(baseUrl)
        .subscribe((data: VideoListResponse): void => {
          data.items.forEach((item: VideoItem): void => {
            item.color = this.getColor(new Date(item.snippet.publishedAt));
          });
          this.videosSubject.next(data.items);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getColor(date: Date): string { //TODO BorderColorDirective factory
    const currentDate: Date = new Date();
    const itemDate: Date = new Date(date);
    const diffTime: number = Math.abs(currentDate.getTime() - itemDate.getTime());
    const diffDays: number = Math.ceil(diffTime / this.timeMap['day']);

    if (diffDays < this.timeMap['week']) {
      return this.colorMap['red'];
    } else if (diffDays < this.timeMap['month']) {
      return this.colorMap['blue'];
    } else if (diffDays < this.timeMap['halfYear']) {
      return this.colorMap['green'];
    } else {
      return this.colorMap['yellow'];
    }
  }
}
