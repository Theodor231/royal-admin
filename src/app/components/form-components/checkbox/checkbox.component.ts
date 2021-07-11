import { Component, Input } from '@angular/core';
import { HelpersService } from 'src/app/_services/helpers.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() type = 'text' as string;
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = '' as string;

  constructor(public helpers: HelpersService) {}

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }
}
