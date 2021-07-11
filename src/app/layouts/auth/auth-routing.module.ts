import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/views/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/views/register/register.component';
import { ResetComponent } from 'src/app/modules/auth/views/reset/reset.component';
import { ForgotPasswordComponent } from 'src/app/modules/auth/views/forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset',
        component: ResetComponent,
      },
    ],
  },
  {
    path: '*',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
