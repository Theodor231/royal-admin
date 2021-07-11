import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/_helpers/must-much.validator';
import { AlertService } from 'src/app/_services/helpers/alert.service';
import { AuthService } from 'src/app/_services/api/auth.service';
import { LoaderService } from 'src/app/_services/helpers/loader.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  token = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {
    this.route.queryParams.subscribe((param: any) => {
      this.check_reset_token(param.token);
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group(
      {
        repeat_password: [null, [Validators.required]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
      },
      MustMatch('password', 'repeat_password')
    );
  }

  submit(event: any): void {
    event.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loaderService.showLocalLoader();

    const params = {
      password: this.form.value.password,
      repeat_password: this.form.value.repeat_password,
      token: this.token,
    };
    this.authService.resetPassword(params).subscribe(
      (response: any) => {
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.alertService.showError(error.error.message);
        this.loaderService.hideLocalLoader();
      },
      () => {
        this.loaderService.hideLocalLoader();
      }
    );
  }

  check_reset_token(token: string): void {
    this.loaderService.show();
    this.authService.checkResetToken({ token }).subscribe(
      () => {
        this.token = token;
      },
      (error) => {
        this.router.navigate(['/']);
      },
      () => {
        this.loaderService.show();
      }
    );
  }
}
