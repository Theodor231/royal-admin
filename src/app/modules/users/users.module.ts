import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexComponent } from "./views/index/index.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/components/components.module";
import { RouterModule, Routes } from "@angular/router";
import { DialogsModule } from "src/app/dialogs/dialogs.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { CreateComponent } from "src/app/modules/users/views/create/create.component";
import { EditComponent } from "src/app/modules/users/views/edit/edit.component";
import { MaterialModule } from "src/app/plugins/material/material.module";

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "edit/:id",
    component: EditComponent,
  },
  {
    path: "page/:page",
    component: IndexComponent,
  },
  {
    path: "",
    redirectTo: "page/1",
    pathMatch: "full",
  },
  {
    path: ":page",
    redirectTo: "page/1",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [CreateComponent, EditComponent, IndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    DialogsModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    MaterialModule,
  ],
})
export class UsersModule {}
