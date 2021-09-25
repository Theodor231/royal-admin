import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpersService } from "src/app/_services/helpers.service";
import { ApiService } from "src/app/api/api.service";
import { IndexModelComponent } from "src/app/models/index-model/index-model.component";

@Component({
  selector: "app-goods-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent extends IndexModelComponent implements OnInit {
  module;
  constructor(
    public helpers: HelpersService,
    public api: ApiService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(helpers, api, formBuilder, route);
    this.module = "goods";
  }

  createForm(): void {
    this.filter = this.formBuilder.group({
      name_ro: [null],
      name_en: [null],
      name_ru: [null],
      price: [null],
      discount: [null],
    });
  }
}
