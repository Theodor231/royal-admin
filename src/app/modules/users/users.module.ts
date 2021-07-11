import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './views/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CreateComponent } from '../users/views/create/create.component';
import { EditComponent } from '../users/views/edit/edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'page/:page',
    component: IndexComponent,
  },
  {
    path: '',
    redirectTo: 'page/1',
    pathMatch: 'full',
  },
  {
    path: ':page',
    redirectTo: 'page/1',
    pathMatch: 'full',
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
  ],
})
export class UsersModule {}
