import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, filter, Observable, switchMap} from 'rxjs';
import {FormControl} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';
import {VideoItem} from '@app/youtube/models/video-item-model';

const DEBOUNCE = 500;
const MIN_LENGTH = 3;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @Output() searchClicked = new EventEmitter<void>();

  @Output() filter = new EventEmitter<string>();

  @Output() sort = new EventEmitter<string>();

  searchText = new FormControl();

  constructor(private service: VideoService) {
    this.searchText.valueChanges.pipe(
      debounceTime(DEBOUNCE),
      filter((value: string | null): value is string =>
        value !== null && value.length >= MIN_LENGTH),
      switchMap(value => this.searchAPI(value))
    ).subscribe(results => {
      this.service.updateVideos(results.items as VideoItem[]);
    });
  }

  searchAPI(value: string): Observable<YoutubeResponse> {
    return this.service.findByCriteria(value);
  }

  search(searchText: string): void {
    this.searchClicked.emit();
    this.filter.emit(searchText);
    this.service.setSearchText(searchText);
  }
}
