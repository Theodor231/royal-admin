import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { HelpersService } from "src/app/_services/helpers.service";
import { CreateModelComponent } from "../../../../models/create-model/create-model.component";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent extends CreateModelComponent implements OnInit {
  categories = [] as Array<any>;

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiService,
    public helpers: HelpersService,
    public router: Router
  ) {
    super(formBuilder, api, helpers, router);
    this.module = "goods";
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.getCategories();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name_ro: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      name_en: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      name_ru: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      image: [null, Validators.required],
      price: [
        null,
        [Validators.min(0.1), Validators.max(100000), Validators.required],
      ],
      height: [
        null,
        [Validators.min(0.1), Validators.max(100000), Validators.required],
      ],
      width: [
        null,
        [Validators.min(0.1), Validators.max(100000), Validators.required],
      ],
      length: [
        null,
        [Validators.min(0.1), Validators.max(100000), Validators.required],
      ],
      discount: [null, [Validators.min(0), Validators.max(100)]],
      description_ro: [
        null,
        [Validators.minLength(10), Validators.maxLength(2000)],
      ],
      description_en: [
        null,
        [Validators.minLength(10), Validators.maxLength(2000)],
      ],
      description_ru: [
        null,
        [Validators.minLength(10), Validators.maxLength(2000)],
      ],
      categoryId: [null, [Validators.required]],
    });
  }

  async getCategories(): Promise<void> {
    try {
      this.categories = await this.api.categories().getList();
    } catch (e) {
      this.helpers.alert().showError(e.message);
    }
  }
}
