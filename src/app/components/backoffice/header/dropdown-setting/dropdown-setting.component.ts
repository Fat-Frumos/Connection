import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SortService} from '@app/service/sort.service';

@Component({
  selector: 'app-dropdown-setting',
  templateUrl: './dropdown-setting.component.html',
  styleUrls: ['./dropdown-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownSettingComponent implements OnInit {

  @Input() searchText!: string;

  @Input() inputValue: string;

  constructor(private service: SortService) {
    this.inputValue = '';
  }

  ngOnInit(): void {
    this.service.searchText$.subscribe(searchText => {
      this.inputValue = searchText;
    });

    this.service.criteria$.subscribe(criteria => {
      this.searchText = criteria;
    });
  }

  onFilter(): void {
    this.service.setSearchText$(this.inputValue);
  }

  onSort(field: string): void {
    this.service.onSortDirection(field);
  }
}
