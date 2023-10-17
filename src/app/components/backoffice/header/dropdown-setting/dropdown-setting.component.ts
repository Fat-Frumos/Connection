import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-dropdown-setting',
  templateUrl: './dropdown-setting.component.html',
  styleUrls: ['./dropdown-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownSettingComponent {
  searchText: string;

  constructor(private video: VideoService) {
    this.searchText = '';
  }

  onSort(criteria: string) {
    this.video.sortBy(criteria);
  }

  onFilter(searchText: string) {
    this.searchText = searchText;
    this.video.filterBy(this.searchText);
  }
}
