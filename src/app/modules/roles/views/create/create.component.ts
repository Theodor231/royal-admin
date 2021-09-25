import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { HelpersService } from "src/app/_services/helpers.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  loading = false as boolean;
  errors = {} as any;

  constructor(
    private api: ApiService,
    private helpers: HelpersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
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

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    try {
      await this.api.roles().create(this.form.value);
      this.helpers.alert().showSuccess("Successful created");
      await this.router.navigate([
        `${this.helpers.localization().activeLanguage}/roles`,
      ]);
    } catch (e) {
      if (e.error && e.error.hasOwnProperty("errors")) {
        this.errors = e.errors;
        setTimeout(() => {
          this.errors = {};
        }, 5000);
      }
      this.helpers.alert().showError(e.message);
      this.loading = false;
    }
  }

  changeStatus(): void {
    this.form.markAllAsTouched();
    document.getElementById("2").scrollIntoView();
    setTimeout(() => {
      this.scrollToFirstInvalidControl();
    }, 2000);
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector("form .ng-invalid");

    firstInvalidControl.focus();
  }

  t(locale): string {
    return this.helpers.localization().translate(locale);
  }

  getErrorMessage(field: string): string {
    const error = this.form.controls[field] as any;

    if (this.errors[field]) {
      return this.errors[field];
    }

    if (error.hasError("required")) {
      return this.t("global_validation.required");
    }

    if (error.hasError("minlength")) {
      return `${this.t("global_validation.minlength")} ${
        error.errors.minlength.requiredLength
      } (${error.errors.minlength.actualLength})`;
    }

    if (error.hasError("maxlength")) {
      return `${this.t("global_validation.maxlength")} ${
        error.errors.maxlength.requiredLength
      } (${error.errors.maxlength.actualLength}). `;
    }

    if (error.hasError("email")) {
      return "Not a valid email";
    }

    return "";
  }
}
