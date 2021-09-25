import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateDirective } from "./translate.directive";

@NgModule({
  declarations: [TranslateDirective],
  imports: [CommonModule],
  exports: [TranslateDirective],
})
export class DirectivesModule {}
