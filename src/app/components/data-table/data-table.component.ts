import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { HelpersService } from "../../_services/helpers.service";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent implements OnInit {
  @Input() showFilters = false as boolean;
  @Input() loading = false as boolean;
  @Input() items = [] as Array<any>;
  @Input() pageSizeOptions = [5, 10, 25, 100] as Array<any>;
  @Input() columnsToDisplay = [] as Array<any>;
  @Input() headers = [] as Array<any>;
  @Input() params = {} as any;
  @Input() module = "" as string;

  @Output() sort = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() filter = new EventEmitter();

  constructor(public helpers: HelpersService) {}

  ngOnInit(): void {}

  toggleFilter(): void {
    this.filter.emit();
  }

  loadData(): void {
    this.update.emit();
  }

  sortData(event: any): void {
    this.sort.emit(event);
  }

  openConfirm(id: number): void {
    this.confirm.emit(id);
  }
  changePage(event: any): void {
    this.page.emit(event);
  }
}
