import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services/helpers/alert.service";
import { AuthService } from "src/app/api/modules/auth.service";
import { LoaderService } from "src/app/_services/helpers/loader.service";
import { LocalizationService } from "../../../../_services/helpers/localization.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  errors = {} as any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  async submit(event: any): Promise<void> {
    event.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loaderService.showLocalLoader();

    try {
      const response = await this.authService.forgotPassword(
        this.form.value.email
      );
      await this.router.navigate(["/auth/login"]);
      this.alertService.showSuccess(response.message);
    } catch (e) {
      this.alertService.showError(e.error.message);
    }
    this.loaderService.hideLocalLoader();
  }

  getErrorMessage(field: string): string {
    const error = this.form.controls[field] as any;

    if (this.errors[field]) {
      return this.errors[field];
    }

    if (error.hasError("required")) {
      return this.localizationService.translate("global_validation.required");
    }

    if (error.hasError("minlength")) {
      return `${this.localizationService.translate(
        "global_validation.minlength"
      )} ${error.errors.minlength.requiredLength} (${
        error.errors.minlength.actualLength
      })`;
    }

    if (error.hasError("maxlength")) {
      return `${this.localizationService.translate(
        "global_validation.maxlength"
      )} ${error.errors.maxlength.requiredLength} (${
        error.errors.maxlength.actualLength
      }). `;
    }

    if (error.hasError("email")) {
      return "Not a valid email";
    }

    return "";
  }
}
