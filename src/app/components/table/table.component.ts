import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ConfirmService } from '../../_services/helpers/confirm.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() headers = [];
  @Input() items = [];
  @Input() loading = false;
  @Input() pagination = {} as any;
  @Output() remove = new EventEmitter();
  @Output() changePage = new EventEmitter();

  itemsPerPage = [5, 10, 50, 100, 500] as Array<number>;

  constructor(private confirmService: ConfirmService) {}

  ngOnInit(): void {}

  removeItem(id: number): void {
    this.remove.emit(id);
  }

  setPagination(): void {
    this.changePage.emit();
  }

  setPage(page: number): void {
    this.pagination.page = Number(this.pagination.page) + Number(page);
    this.changePage.emit();
  }

  openConfirm(id): void {
    this.confirmService.setConfirm({
      accept: () => {
        this.removeItem(id);
      },
    });
  }

  get getMinItems(): number {
    if (this.pagination.total > this.pagination.per_page) {
      return (this.pagination.page - 1) * this.pagination.per_page + 1;
    } else if (this.pagination.total === 0) {
      return 0;
    }
    return 1;
  }

  get getMaxItems(): number {
    if (
      this.pagination.per_page * this.pagination.page <=
      this.pagination.total
    ) {
      return this.pagination.per_page * this.pagination.page;
    } else {
      return (
        this.pagination.per_page * this.pagination.page -
        (this.pagination.per_page * this.pagination.page -
          this.pagination.total)
      );
    }
  }
}
