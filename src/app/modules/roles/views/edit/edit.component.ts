import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpersService } from "src/app/_services/helpers.service";
import { ApiService } from "src/app/api/api.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  loading = false as boolean;
  errors = {} as any;
  roles = [] as Array<any>;

  id = null as number;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private helpers: HelpersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.route.params.subscribe((param: any) => {
      if (param?.id) {
        this.id = param.id;
        this.getItem();
      }
    });
  }

  async submit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;

    try {
      await this.api.roles().edit(this.id, this.form.value);
      this.helpers.alert().showSuccess("Successful edited.");
      await this.router.navigate(["ro/roles"]);
    } catch (e) {
      if (e.hasOwnProperty("error")) {
        this.errors = e.error;
        setTimeout(() => {
          this.errors = {};
        }, 5000);
      }
      this.helpers.alert().showError(e.error.message);
    }
    this.loading = false;
  }

  async getItem(): Promise<void> {
    this.loading = true;

    try {
      const response = this.api.roles().getForEdit(this.id);
      const formData = this.helpers.setForm(response, this.form);
      this.form.setValue({ ...formData });
    } catch (e) {
      if (e.error.hasOwnProperty("errors")) {
        this.errors = e.errors;
      }
      this.helpers.alert().showError(e.error.message);
    }
    this.loading = false;
  }

  translate(locale: string): string {
    return this.helpers.localization().translate(locale);
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      guard: [null, Validators.required],
      alias: [null, Validators.required],
    });
  }
}
