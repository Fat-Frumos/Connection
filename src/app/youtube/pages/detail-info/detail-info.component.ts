import {Component, OnInit} from '@angular/core';
import {VideoDataModel} from '@app/youtube/models/video-data-model';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  data: VideoDataModel;

  constructor() {
    this.data = {} as VideoDataModel;
  }

  ngOnInit(): void {
    const data = localStorage.getItem('video');
    this.data = data
      ? JSON.parse(data) as VideoDataModel
      : {} as VideoDataModel;
  }
}
