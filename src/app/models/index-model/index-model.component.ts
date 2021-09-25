import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HelpersService } from "../../_services/helpers.service";
import { ApiService } from "../../api/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-index-model",
  templateUrl: "./index-model.component.html",
  styles: [""],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexModelComponent implements OnInit {
  @Input() moduleName = "";
  items = [] as Array<any>;
  headers = [] as Array<any>;
  loading = false;
  pageSizeOptions = [5, 10, 25, 100];
  showFilters = false;
  module;
  columnsToDisplay = [];

  filter: FormGroup;

  params = {
    page: 1,
    per_page: 10,
    filter: {} as any,
  } as any;

  constructor(
    public helpers: HelpersService,
    public api: ApiService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private ref?: ChangeDetectorRef
  ) {
    if (this.ref) {
      this.ref.reattach();
    }
    this.loading = true;
    this.module = this.moduleName;
    route.params.subscribe((params: any) => {
      if (params.page) {
        this.params.page = params.page;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.loadData();
  }

  async removeItem(id: number): Promise<void> {
    this.loading = true;
    try {
      const response = await this.api[this.module]().delete(id);
      this.helpers.alert().showSuccess(response.message);
      await this.loadData();
    } catch (e) {
      this.helpers.alert().showError(e.error.msg || e.message);
      this.loading = false;
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  createForm(): void {
    this.filter = this.formBuilder.group({
      name: [null],
      email: [null],
    });
  }

  async resetFilter(): Promise<void> {
    this.filter.reset();
    this.params.filter = {};
    await this.loadData();
  }

  translate(locale): string {
    return this.helpers.localization().translate(locale);
  }

  async loadData(): Promise<void> {
    this.loading = true;
    if (this.ref) {
      this.ref.reattach();
    }

    this.parseFilter();
    try {
      const response = await this.api[this.module]().getData({
        ...this.params,
        filter: JSON.stringify(this.params.filter),
      });
      this.items = response.items;
      this.params.page = response.page;
      this.params.total = response.total;
      this.columnsToDisplay = [
        ...response.headers.map((item: any) => item.value),
        "actions",
      ];
      this.headers = [
        ...response.headers,
        { value: "actions", text: "", sortable: false, width: "1em" },
      ];
    } catch (e) {
      this.helpers.alert().showError(e.error.message);
    }
    this.loading = false;
    if (this.ref) {
      this.ref.detach();
      console.log(this.ref);
    }
  }

  async changePage(page: any): Promise<void> {
    this.params.page = page.pageIndex + 1;
    this.params.per_page = page.pageSize;
    await this.loadData();
  }

  async sortData(event: any): Promise<void> {
    if (!event.direction) {
      delete this.params.order;
    } else {
      this.params.order = JSON.stringify({
        [event.active]: event.direction.toUpperCase(),
      });
    }
    await this.loadData();
  }

  parseFilter(): any {
    this.params.filter = {};
    for (const key in this.filter.value) {
      if (!!this.filter.value[key]) {
        this.params.filter[key] = this.filter.value[key];
      }
    }
  }

  toggleFilter(): void {
    this.showFilters = !this.showFilters;
  }

  async openConfirm(id: number): Promise<void> {
    this.helpers.confirm().setConfirm({
      accept: () => {
        this.removeItem(id);
      },
    });
  }
}
