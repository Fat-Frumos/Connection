import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, filter, Subject, switchMap} from 'rxjs';
import {FormControl} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';

const DEBOUNCE = 500;
const MIN_LEN = 3;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Output() searchClicked = new EventEmitter<void>();

  @Output() filter = new EventEmitter<string>();

  @Output() sort = new EventEmitter<string>();

  searchTerm$ = new Subject<string>();

  searchText = new FormControl();

  constructor(private service: VideoService) {
    this.searchText.valueChanges.pipe(
      debounceTime(DEBOUNCE),
      filter((value: string | null): value is string =>
        value !== null && value.length >= MIN_LEN),
      switchMap(value => this.service.searchVideos(value))
    ).subscribe(results => {
      console.log(results);
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

  ngOnInit(): void {
    this.searchTerm$.pipe(
      filter(term => term.length > MIN_LEN),
      debounceTime(DEBOUNCE))
      .subscribe(value => {
        this.service.searchVideos(value);
      });
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }
}
