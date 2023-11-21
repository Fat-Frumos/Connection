import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
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

  @Input() video: CustomCard;

  constructor(
    private store: Store,
    private router: Router) {
    this.video = {} as CustomCard;
  }

  showDetails() {
    console.log('Task2 toggleFavorite');
    this.router.navigate(['/main', this.video.snippet.channelId]).catch((error) => {
      console.error('Navigation error', error);
    });
  }
}
