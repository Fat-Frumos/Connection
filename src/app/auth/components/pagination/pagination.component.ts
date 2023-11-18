import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {itemSize} from '@app/config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage$!: Observable<number>;

  @Input() totalPages = itemSize;

  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;

  ngOnInit() {
    this.currentPage$.subscribe(value => {
      this.currentPage = value;
    });
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.pageChange.emit(newPage);
    }
  }
}
