import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchItemComponent {
  @Input() video!: VideoItem;
}
