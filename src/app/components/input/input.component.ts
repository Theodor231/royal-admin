import { Component, Input } from "@angular/core";
import { HelpersService } from "../../_services/helpers.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "form-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent {
  @Input() icon = "";
  @Input() label = "";
  @Input() type = "text" as string;
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = "" as string;
  @Input() appearance = "outline" as any;

  constructor(public helpers: HelpersService) {}

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }
}
