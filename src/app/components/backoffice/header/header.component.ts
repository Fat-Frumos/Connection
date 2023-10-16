import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {SearchService} from '@app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();

  searchValue = '';

  constructor(
    private readonly searchService: SearchService) {
    console.log(searchService.search.value);
  }

  search() {
    this.searchClicked.emit();
    this.searchService.setSearchText(this.searchValue);
  }
}
