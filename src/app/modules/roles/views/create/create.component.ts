import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { HelpersService } from 'src/app/_services/helpers.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
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
      name: [null, Validators.required],
      guard: [null, Validators.required],
      alias: [null, Validators.required],
    });
  }

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    await this.api
      .roles()
      .create(this.form.value)
      .subscribe(
        () => {
          this.helpers.alert().showSuccess('Successful created');
          this.router.navigate([
            `${this.helpers.localization().activeLanguage}/roles`,
          ]);
        },
        (e) => {
          if (e.error && e.error.hasOwnProperty('errors')) {
            this.errors = e.errors;
            setTimeout(() => {
              this.errors = {};
            }, 5000);
          }
          this.helpers.alert().showError(e.message);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  changeStatus(): void {
    this.form.markAllAsTouched();
    document.getElementById('2').scrollIntoView();
    setTimeout(() => {
      this.scrollToFirstInvalidControl();
    }, 2000);
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      'form .ng-invalid'
    );

    firstInvalidControl.focus();
  }

  t(locale): string {
    return this.helpers.localization().translate(locale);
  }

}
