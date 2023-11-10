import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, filter, Observable, switchMap} from 'rxjs';
import {FormControl} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {HttpClient} from '@angular/common/http';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';
import {keyApi, urlApi} from '@app/config';

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

  constructor(
    private readonly service: VideoService,
    private http: HttpClient
  ) {
    this.searchText.valueChanges.pipe(
      debounceTime(DEBOUNCE),
      filter((value: string | null): value is string =>
        value !== null && value.length >= MIN_LENGTH),
      switchMap(value => this.searchAPI(value))
    ).subscribe(results => {
      console.log(results);
    });
  }

  searchAPI(value: string): Observable<YoutubeResponse> {
    const url = `${urlApi}?part=snippet&maxResults=25&q=${value}&key=${keyApi}`;
    return this.http.get<YoutubeResponse>(url);
  }

  search(searchText: string): void {
    this.searchClicked.emit();
    this.filter.emit(searchText);
    this.service.setSearchText(searchText);
  }
}
