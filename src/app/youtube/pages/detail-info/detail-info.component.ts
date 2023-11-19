import {Component, OnInit} from '@angular/core';
import {VideoDataModel} from '@app/youtube/models/video-data-model';
import {StorageService} from '@app/youtube/services/storage.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  data: VideoDataModel;

  constructor(private storage: StorageService) {
    this.data = {} as VideoDataModel;
  }

  ngOnInit(): void {
    this.data = this.storage.getVideo();
  }
}
