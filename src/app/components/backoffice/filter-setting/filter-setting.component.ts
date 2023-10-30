import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SortService} from '@app/service/sort.service';

@Component({
  selector: 'app-dropdown-setting',
  templateUrl: './filter-setting.component.html',
  styleUrls: ['./filter-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterSettingComponent implements OnInit {

  @Input() searchText: string;

  @Input() inputValue: string;

  constructor(private service: SortService) {
    this.inputValue = '';
    this.searchText = '';
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
