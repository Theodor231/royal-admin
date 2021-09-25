import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "./table/table.component";
import { RouterModule } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";
import { LocalLoaderComponent } from "./local-loader/loader.component";
import { ServicesComponent } from "./services/services.component";
import { FormSelectComponent } from "./form-select/form-select.component";
import { GlobalLoaderComponent } from "./loader/global-loader.component";
import { IconComponent } from "./icon/icon.component";
import { FileUploaderComponent } from "./form-components/file-uploader/file-uploader.component";
import { DatePickerComponent } from "./form-components/date-picker/date-picker.component";
import { LangSwitcherComponent } from "./lang-switcher/lang-switcher.component";
import { CheckboxComponent } from "./form-components/checkbox/checkbox.component";
import { IndexModelComponent } from "../models/index-model/index-model.component";
import { MaterialModule } from "../plugins/material/material.module";
import { DataTableComponent } from "./data-table/data-table.component";

@NgModule({
  declarations: [
    InputComponent,
    TableComponent,
    LoaderComponent,
    LocalLoaderComponent,
    ServicesComponent,
    FormSelectComponent,
    GlobalLoaderComponent,
    IconComponent,
    FileUploaderComponent,
    DatePickerComponent,
    LangSwitcherComponent,
    CheckboxComponent,
    IndexModelComponent,
    DataTableComponent,
  ],
    exports: [
        InputComponent,
        TableComponent,
        LoaderComponent,
        LocalLoaderComponent,
        ServicesComponent,
        FormSelectComponent,
        GlobalLoaderComponent,
        IconComponent,
        DatePickerComponent,
        FileUploaderComponent,
        LangSwitcherComponent,
        CheckboxComponent,
        IndexModelComponent,
        DataTableComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
})
export class ComponentsModule {}
