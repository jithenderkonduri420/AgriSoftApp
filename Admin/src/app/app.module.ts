import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidenavComponent } from './_common/sidenav/sidenav.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { HeaderComponent } from './_common/header/header.component';
import { LoginComponent } from './_pages/login/login.component';
import { DistributorComponent } from './_components/distributor/distributor.component';
import { DistributorsListComponent } from './_components/distributors-list/distributors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    DistributorComponent,
    DistributorsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
