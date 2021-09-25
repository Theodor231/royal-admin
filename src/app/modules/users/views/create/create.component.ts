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
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  loading = false as boolean;
  errors = {} as any;
  roles = [] as Array<any>;

  services = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private helpers: HelpersService,
    private router: Router,
    private el: ElementRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      roleId: [null, Validators.required],
      avatar: [null],
      email: [null, this.emailRegx],
      password: [null, [Validators.minLength(8), Validators.maxLength(128)]],
    });
    await this.getRoles();
  }

  async getRoles(): Promise<void> {
    try {
      this.roles = await this.api.roles().getList();
    } catch (e) {
      this.helpers.alert().showError(e.error.message);
    }
  }
  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    try {
      await this.api.users().create(this.helpers.toFormData(this.form.value));
      this.helpers.alert().showSuccess("Successful created");
      await this.router.navigateByUrl("/ro/users");
    } catch (e) {
      if (e.error.hasOwnProperty("errors")) {
        this.errors = e.error.errors;
        setTimeout(() => {
          this.errors = {};
        }, 5000);
      }
      this.helpers.alert().showError(e.error.message);
    }
    this.loading = false;
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

    firstInvalidControl.focus(); // without smooth behavior
  }

  t(locale: string): string {
    return this.helpers.localization().translate(locale);
  }
}
