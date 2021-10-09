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
  form: FormGroup;
  loading = false as boolean;
  errors = {} as any;

  constructor(
    public api: ApiService,
    public helpers: HelpersService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    super(formBuilder, api, helpers, router);
    this.module = "roles";
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      guard: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      alias: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
    });
  }
}
