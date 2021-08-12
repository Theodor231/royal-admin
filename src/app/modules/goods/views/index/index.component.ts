import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/_services/helpers.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  items = [] as Array<any>;
  headers = [] as Array<any>;
  loading = false;
  showFilters = false;
  module = 'goods';

  filter: FormGroup;

  params = {
    page: 1,
    per_page: 10,
    filter: {} as any,
  } as any;

  constructor(
    public helpers: HelpersService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private host: ElementRef<HTMLElement>,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    route.params.subscribe((params: any) => {
      if (params.page) {
        this.params.page = params.page;
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.parseFilter();

    const params = {} as any;
    for (const key in this.params) {
      if (!!this.params[key]) {
        params[key] = this.params[key];
      }
    }

    params.filter = JSON.stringify(params.filter);

    this.api[this.module]()
      .getData(params)
      .subscribe(
        (data: any) => {
          this.headers = [
            ...data.headers,
            { value: 'actions', text: '', width: '5' },
          ];

          this.items = data.items;
          this.params.total = data.total;
        },
        (e) => {
          this.helpers.alert().showError(e.error.message);
        },
        () => {
          this.loading = false;
        }
      );
  }

  removeItem(id: number): void {
    this.loading = true;
    this.api[this.module]()
      .delete(id)
      .subscribe(
        (response) => {
          this.helpers.alert().showSuccess(response.message);
          this.loadData();
        },
        (e: any) => {
          this.helpers.alert().showError(e.error.msg || e.message);
        },
        () => {
          this.loading = false;
        }
      );
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  createForm(): void {
    this.filter = this.formBuilder.group({
      name_ro: [null],
      name_en: [null],
      name_ru: [null],
    });
  }

  resetFilter(): void {
    this.filter.reset();
    this.params.filter = {};
    this.loadData();
  }

  parseFilter(): void {
    for (const key in this.filter.value) {
      if (this.filter.value[key]) {
        this.params.filter[key] = this.filter.value[key];
      } else {
        delete this.params.filter[key];
      }
    }
  }

  changePage(event: any): void {
    this.loadData();
  }

  t(locale): string {
    return this.helpers.localization().translate(`${this.module}.${locale}`);
  }

  openConfirm(id): void {
    this.helpers.confirm().setConfirm({
      accept: () => {
        this.removeItem(id);
      },
    });
  }
}
