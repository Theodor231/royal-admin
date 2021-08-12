import { Component } from '@angular/core';
import { ConfirmService } from '../../_services/helpers/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  isScaled = false as boolean;

  constructor(public confirmService: ConfirmService) {}

  async confirm(): Promise<void> {
    await this.confirmService.confirm.accept();
    this.confirmService.showConfirm = false;
  }

  decline(): void {
    this.confirmService.confirm.decline();
    this.confirmService.showConfirm = false;
  }

  toggleScale(): void {
    this.isScaled = true;

    setTimeout(() => {
      this.isScaled = false;
    }, 100);
  }
}
