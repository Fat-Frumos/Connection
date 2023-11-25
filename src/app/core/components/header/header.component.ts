import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, filter, Subscription, switchMap} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {VideoService} from '@app/youtube/services/video.service';
import {Store} from '@ngrx/store';
import {fetchResult} from '@app/redux/actions/custom-card.action';

const DEBOUNCE = 500;
const MIN_LENGTH = 3;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy {

  @Output() searchClicked = new EventEmitter<void>();

  @Output() filter = new EventEmitter<string>();

  @Output() sort = new EventEmitter<string>();

  searchText = new FormControl();

  public formData: FormData = new FormData();

  public subscription: Subscription;

  public formGroup: FormGroup = this.formBuilder.group({
    searchInput: ['']
  });

  constructor(
    private store: Store,
    private service: VideoService,
    private formBuilder: FormBuilder
  ) {
    this.subscription = this.formGroup.valueChanges
      .subscribe((value: FormData): void => {
        this.formData = value;
        this.searchBy('');
      });
    this.fetchData();
    this.store.subscribe(console.log);
  }

  private fetchData(): void {
    this.searchText.valueChanges.pipe(
      debounceTime(DEBOUNCE),
      filter((value: string | null): value is string =>
        value !== null && value.length >= MIN_LENGTH),
      switchMap(value =>
        this.service.fetchCustomCards(value)))
      .subscribe(results => {
        this.service.updateVideos(results);
      });
  }

  searchBy(searchText: string): void {
    this.searchClicked.emit();
    this.filter.emit(searchText);
    this.service.setSearchText(searchText);
    this.store.dispatch(fetchResult({result: searchText}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
