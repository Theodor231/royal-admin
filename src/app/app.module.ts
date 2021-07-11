import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { LoaderService } from './_services/helpers/loader.service';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
        import('./layouts/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
        import('./layouts/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    LoaderService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
