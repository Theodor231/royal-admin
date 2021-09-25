import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services/helpers/alert.service";
import { AuthService } from "src/app/api/modules/auth.service";
import { LoaderService } from "src/app/_services/helpers/loader.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private alertService: AlertService
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
      await this.router.navigate(["/"]);
      this.alertService.showSuccess(response.message);
    } catch (e) {
      this.alertService.showError(e.error.message);
    }
    this.loaderService.hideLocalLoader();
  }
}
