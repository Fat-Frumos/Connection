import {Component, ViewEncapsulation} from '@angular/core';
import {SearchService} from '@app/service/search.service';
import {HiddenDirective} from '@app/directive/hidden.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  isVisible = false;

  searchText = '';

  constructor(
    private readonly searchService: SearchService,
    private readonly hidden: HiddenDirective) {
    console.log(searchService.search.value);
  }

  public openDropdownSetting(): void {
    this.isVisible = !this.isVisible;
  }

  setSearchText() {
    this.hidden.isSubmitted = true;
    this.searchService.setSearchText(this.searchText);
    console.log(this.hidden.isSubmitted);
  }
}
