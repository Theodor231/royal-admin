import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../../api/api.service";
import { HelpersService } from "../../_services/helpers.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-model",
  templateUrl: "./create-model.component.html",
  styleUrls: ["./create-model.component.scss"],
})
export class CreateModelComponent {
  form: FormGroup;
  loading = false as boolean;
  errors = {} as any;
  module;

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiService,
    public helpers: HelpersService,
    public router: Router
  ) {}

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      await this.api[this.module]().create(
        this.helpers.toFormData(this.form.value)
      );
      this.helpers.alert().showSuccess("Successful created");
      await this.router.navigateByUrl(
        `/${this.helpers.localization().activeLanguage}/${this.module}`
      );
    } catch (e) {
      if (e.hasOwnProperty("errors")) {
        this.errors = e.errors;
        setTimeout(() => {
          this.errors = {};
        }, 5000);
      }
      this.helpers.alert().showError(e.message);
      this.loading = false;
    }
  }

  $t(locale: string): string {
    return this.helpers.localization().translate(locale);
  }
}
