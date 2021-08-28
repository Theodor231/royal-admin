import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/helpers/alert.service';
import { AuthService } from 'src/app/_services/api/auth.service';
import { LoaderService } from 'src/app/_services/helpers/loader.service';
import { GeneralService } from '../../../../_services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        'admin@gmail.com',
        [Validators.required, Validators.pattern(this.emailRegx)],
      ],
      password: ['11111111', Validators.required],
    });
  }

  async submit(event: any): Promise<void> {
    event.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loaderService.showLocalLoader();

    this.authService.login(this.form.value).subscribe(
      (data: any) => {
        localStorage.setItem('credentials', JSON.stringify(data));
        this.loaderService.hideLocalLoader();
        this.generalService.userEvent.next(data.user);
        this.router.navigate(['ro/users']);
      },
      (error: any) => {
        this.loaderService.hideLocalLoader();
        this.alertService.showError(error.error.message);
      }
    );
  }
}
