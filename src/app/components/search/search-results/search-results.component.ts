import { Component, OnInit } from '@angular/core';
import {VideoListResponse} from '../../../interface/video-response.interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  jsonData!: VideoListResponse;

  baseUrl = 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/response.json';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<VideoListResponse>(this.baseUrl).subscribe(data => {
      this.jsonData = data;
    });

    console.log(this.jsonData);
  }
}
