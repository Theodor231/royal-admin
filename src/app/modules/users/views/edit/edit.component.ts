import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from 'src/app/_services/helpers.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  loading = false as boolean;
  errors = {} as any;
  roles = [] as Array<any>;
  id: number;
  credentials = JSON.parse(localStorage.getItem('credentials')) || null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private helpers: HelpersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      avatar: [null],
      name: [null, Validators.required],
      roleId: [null, Validators.required],
    });
    this.api
      .roles()
      .getList()
      .subscribe((data: Array<any>) => {
        this.roles = data;
      });
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
    this.api
      .users()
      .edit(this.id, this.helpers.toFormData(this.form.value))
      .subscribe(
        (user: any) => {
          if (
            this.credentials &&
            this.credentials.user &&
            this.credentials.user.id &&
            user.avatar
          ) {
            if (this.credentials.user.id === user.id) {
              this.credentials.user.avatar = user.avatar;
              localStorage.setItem(
                'credentials',
                JSON.stringify(this.credentials)
              );
              this.helpers.g().userEvent.next(user);
            }
          }
          this.helpers.alert().showSuccess('Successful edited.');
          this.router.navigate(['ro/users']);
        },
        (e: any) => {
          if (e.hasOwnProperty('error')) {
            this.errors = e.error;
            setTimeout(() => {
              this.errors = {};
            }, 5000);
          }
          this.helpers.alert().showError(e.error.message);
        }
      );
  }

  getItem(): void {
    this.loading = true;
    this.api
      .users()
      .getForEdit(this.id)
      .subscribe(
        (response: any) => {
          const formData = this.helpers.setForm(response, this.form);
          console.log();
          
          this.form.setValue({ ...formData });
          this.loading = false;
        },
        (e) => {
          if (e.error.hasOwnProperty('errors')) {
            this.errors = e.errors;
          }
          this.helpers.alert().showError(e.error.message);
        }
      );
  }

  t(locale: string): string {
    return this.helpers.localization().translate(locale);
  }
}
