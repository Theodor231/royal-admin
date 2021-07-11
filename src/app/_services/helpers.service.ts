import { Injectable } from '@angular/core';
import { AlertService } from './helpers/alert.service';
import { ConfirmService } from './helpers/confirm.service';
import { LoaderService } from './helpers/loader.service';
import { LocalizationService } from './helpers/localization.service';
import { serialize } from 'object-to-formdata';
import moment from 'moment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    private loaderService: LoaderService,
    private localizationService: LocalizationService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private generalService: GeneralService
  ) {}

  loader = () => this.loaderService;
  localization = () => this.localizationService;
  confirm = () => this.confirmService;
  alert = () => this.alertService;
  g = () => this.generalService;

  toFormData(data: any): any {
    return serialize(data, {
      indices: true,
      nullsAsUndefineds: true,
    });
  }

  setForm(data, form): any {
    const object = {};

    for (const key in form.controls) {
      if (typeof data[key] !== 'boolean') {
        object[key] = data[key] ? data[key] : null;
      } else {
        object[key] = data[key];
      }
    }
    return object;
  }

  download(file): void {
    if (file.url) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', file.url);
      link.click();
      return;
    }
  }

  getErrors(field, control): string {
    if (control.errors && Object.keys(control.errors).length) {
      const errorKey = Object.keys(control.errors)[0];
      const error = control.errors[errorKey];
      let errorMessage = this.localization().translate(
        `global_validation.${errorKey}`
      );

      if (Object.keys(error).length) {
        errorMessage = `${errorMessage} ${error[Object.keys(error)[0]]}`;
      }

      return errorMessage;
    }

    if (field) {
      return field;
    }

    return '';
  }

  getDate(date: Date, format = 'DD.MM.YYYY'): any {
    return moment(date).format(format);
  }
}
