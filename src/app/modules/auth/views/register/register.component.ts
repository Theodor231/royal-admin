import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/_helpers/must-much.validator";
import { LoaderService } from "src/app/_services/helpers/loader.service";
import { HelpersService } from "src/app/_services/helpers.service";
import { ApiService } from "src/app/api/api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loader: LoaderService,
    private helpers: HelpersService,
    private api: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.getRoles();
  }

  createForm(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          null,
          [Validators.required, Validators.pattern(this.emailRegx)],
        ],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        name: [null, Validators.required],
        role: [null, Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loader.showLocalLoader();
    try {
      await this.api.auth().register(this.form.value);
      await this.router.navigate(["auth/login"]);
    } catch (e) {
      this.helpers.alert().showError(e.error.message);
    }
    this.loader.hideLocalLoader();
  }

  async getRoles(): Promise<void> {
    try {
      this.roles = await this.api.roles().getList();
    } catch (e) {
      this.helpers.alert().showError(e.message);
    }
  }
}
