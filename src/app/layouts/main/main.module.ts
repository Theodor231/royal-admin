import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { ComponentsModule } from "../../components/components.module";
import { DialogsModule } from "../../dialogs/dialogs.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../plugins/material/material.module";

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    DialogsModule,
    DirectivesModule,
    MaterialModule,
  ],
})
export class MainModule {}
