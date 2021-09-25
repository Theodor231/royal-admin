import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: ":lang",
    component: MainComponent,
    children: [
      {
        path: "users",
        loadChildren: () =>
          import("src/app/modules/users/users.module").then(
            (m) => m.UsersModule
          ),
      },
      {
        path: "roles",
        loadChildren: () =>
          import("src/app/modules/roles/roles.module").then(
            (m) => m.RolesModule
          ),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("src/app/modules/categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: "goods",
        loadChildren: () =>
          import("src/app/modules/goods/goods.module").then(
            (m) => m.GoodsModule
          ),
      },
      {
        path: "error",
        loadChildren: () =>
          import("src/app/modules/errors/errors.module").then(
            (m) => m.ErrorsModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo: "ro/users",
    pathMatch: "full",
  },
  {
    path: ":lang",
    redirectTo: ":lang/users",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
