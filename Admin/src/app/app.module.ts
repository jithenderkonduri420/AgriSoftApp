import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidenavComponent } from './_common/sidenav/sidenav.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { HeaderComponent } from './_common/header/header.component';
import { DistributorComponent } from './_components/distributor/distributor.component';
import { DistributorsListComponent } from './_components/distributors-list/distributors-list.component';
import { AddDistributorComponent } from './_components/add-distributor/add-distributor.component';
import { ProductInvetoryComponent } from './_components/product-invetory/product-invetory.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    DistributorComponent,
    DistributorsListComponent,
    AddDistributorComponent,
    ProductInvetoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
