import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { LocalizationService } from "../_services/helpers/localization.service";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[translate]",
})
export class TranslateDirective implements OnInit {
  @Input() translate = "";

  constructor(private el: ElementRef, private localize: LocalizationService) {}

  ngOnInit(): void {
    this.getLocales();
  }

  getLocales(): void {
    this.el.nativeElement.innerHTML = this.localize.translate(this.translate);
  }
}
