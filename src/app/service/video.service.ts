import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoListResponse} from '@app/interface/video-list-response';
import {baseUrl} from '@app/config';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public jsonData!: VideoListResponse;

  constructor(private http: HttpClient) {
    this.http.get<VideoListResponse>(baseUrl).subscribe(data => {
      this.jsonData = data;
      console.log(data);
    });
  }

  getVideoData(): VideoListResponse {
    return this.jsonData;
  }
}
