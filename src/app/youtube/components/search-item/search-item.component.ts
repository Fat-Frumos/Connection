import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {Router} from '@angular/router';
import {StorageService} from '@app/youtube/services/storage.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchItemComponent {

  @Input() video: VideoItem;

  constructor(
    private router: Router,
    private storage: StorageService) {
    this.video = {} as VideoItem;
  }

  saveDataAndRedirect(): void {
    this.storage.saveVideo(this.video);
    this.router.navigate(['/main', this.video.snippet.channelId]).catch((error) => {
      console.error('Navigation error', error);
    });
  }
}
