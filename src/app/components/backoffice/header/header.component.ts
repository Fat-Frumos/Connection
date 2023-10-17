import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output() sort = new EventEmitter<string>();

  @Output() filter = new EventEmitter<string>();

  searchText: string;

  constructor(
    private readonly videoService: VideoService) {
    this.searchText = '';
  }

  search(): void {
    this.searchClicked.emit();
    this.filter.emit(this.searchText);
    this.videoService.filterBy(this.searchText);
  }
}
