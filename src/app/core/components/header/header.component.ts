import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {VideoService} from '@app/youtube/services/video.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @Output() searchClicked: EventEmitter<void>;

  @Output() filter: EventEmitter<string>;

  @Output() sort: EventEmitter<string>;

  searchText = '';

  constructor(private readonly service: VideoService) {
    this.searchClicked = new EventEmitter<void>();
    this.filter = new EventEmitter<string>();
    this.sort = new EventEmitter<string>();
  }

  search(searchText: string): void {
    this.searchText = searchText;
    this.searchClicked.emit();
    this.filter.emit(this.searchText);
    this.service.setSearchText(this.searchText);
  }
}
