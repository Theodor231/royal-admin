import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user';
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
  items: User[];
  headers = [] as Array<string>;
  loading = false;
  showFilters = false;

  users = [];

  filter: FormGroup;

  params = {
    page: 1,
    per_page: 10,
    total: 7,
    filter: {} as any,
  } as any;

  constructor(
    private api: ApiService,
    private helpers: HelpersService,
    private formBuilder: FormBuilder,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params: any) => {
      if (params.page) {
        this.params.page = Number(params.page);
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
      if (!this.params[key] || !this.params[key].length) {
        params[key] = this.params[key];
      }
    }

    params.filter = JSON.stringify(params.filter);

    this.api
      .roles()
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
    this.api
      .roles()
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
      name: [null],
      alias: [null],
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

  translate(locale): string {
    return this.helpers.localization().translate(locale);
  }

  openConfirm(id): void {
    this.helpers.confirm().setConfirm({
      accept: () => {
        this.removeItem(id);
      },
    });
  }
}
