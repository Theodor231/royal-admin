import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirm: any = {
    title: 'Deletion!',
    message: 'Are you sure the confirm this actions?',
    accept: () => {},
    decline: () => this.decline,
  };

  showConfirm = false as boolean;

  constructor() {}

  setConfirm(options: any): void {
    // tslint:disable-next-line:forin
    for (const key in options) {
      this.confirm[key] = options[key];
    }
    this.showConfirm = true;
  }

  decline(): void {
    this.showConfirm = false;
  }
}
