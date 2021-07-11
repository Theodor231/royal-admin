import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ComponentsModule } from '../../components/components.module';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ThemeComponent } from './components/theme/theme.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent, SideBarComponent, ThemeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    DialogsModule,
    DirectivesModule,
  ],
})
export class MainModule {}
