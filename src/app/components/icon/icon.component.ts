import { Component, Input } from "@angular/core";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent {
  @Input() icon = "";
}
