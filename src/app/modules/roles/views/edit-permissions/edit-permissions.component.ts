import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HelpersService } from "src/app/_services/helpers.service";
import { ApiService } from "src/app/api/api.service";

@Component({
  selector: "app-edit-permissions",
  templateUrl: "./edit-permissions.component.html",
  styleUrls: ["./edit-permissions.component.scss"],
})
export class EditPermissionsComponent implements OnInit {
  permissions = [] as Array<any>;
  loading = false;
  alias = null as string;
  expandedItem = {} as any;

  constructor(
    private api: ApiService,
    private helpers: HelpersService,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params: any) => {
      if (params.alias) {
        this.alias = params.alias;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    try {
      this.permissions = await this.api.roles().getPermissions(this.alias);
    } catch (e) {
      this.helpers.alert().showError(e.error.message);
    }

    this.loading = false;
  }

  translate(locale): string {
    return this.helpers.localization().translate(locale);
  }

  expand(item: any): void {
    if (item && this.expandedItem && item.module === this.expandedItem.module) {
      this.expandedItem = null;
      return;
    }
    this.expandedItem = item;
  }

  async submit(): Promise<void> {
    try {
      await this.api.roles().updatePermissions(this.permissions);
      this.helpers.alert().showSuccess("Successful updated!");
    } catch (e) {
      this.helpers.alert().showSuccess(e.message);
    }
  }

  selectFields(field: string, index): void {
    if (
      this.expandedItem.items[index].fields.some(
        (item: string) => item === field
      )
    ) {
      this.expandedItem.items[index].fields.splice(index, 1);
      return;
    } else {
    }
    this.expandedItem.items[index].fields.push(field);
  }
}
