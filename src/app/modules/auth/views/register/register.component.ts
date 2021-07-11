import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/_helpers/must-much.validator';
import { AlertService } from 'src/app/_services/helpers/alert.service';
import { AuthService } from 'src/app/_services/api/auth.service';
import { LoaderService } from 'src/app/_services/helpers/loader.service';
import { RolesService } from 'src/app/_services/api/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loader: LoaderService,
    private alertService: AlertService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
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
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    this.rolesService.getList().subscribe((data: Array<any>) => {
      this.roles = data;
    });
  }

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loader.showLocalLoader();
    this.authService.register(this.form.value).subscribe(
      () => {
        this.loader.hideLocalLoader();
        this.router.navigate(['auth/login']);
      },
      (error: any) => {
        this.loader.hideLocalLoader();
        this.alertService.showError(error.error.message);
      }
    );
  }
}
