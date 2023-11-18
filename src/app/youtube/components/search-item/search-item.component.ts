import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  addCustomCard
} from '@app/redux/actions/custom-card.action';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchItemComponent {

  @Input() video: VideoItem;

  constructor(
    private store: Store,
    private router: Router) {
    this.video = {} as VideoItem;
  }

  saveDataAndRedirect(): void {
    const customCard: CustomCard =
      {
        id: this.video.id.videoId,
        title: this.video.snippet.title,
        description: this.video.snippet.description,
        imageUrl: this.video.snippet.thumbnails.default.url,
        videoUrl: `https://www.youtube.com/watch?v=${this.video.id.videoId}`,
        creationDate: new Date()
      };
    this.store.dispatch(addCustomCard({customCard}));
    this.router.navigate(['/main', this.video.snippet.channelId]).catch((error) => {
      console.error('Navigation error', error);
    });
  }

  onFavoriteClick() {
    console.log('Task2 toggleFavorite');
  }
}
