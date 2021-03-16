import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { OrderManagementComponent } from './_components/order-management/order-management.component';
import { OrderInvoiceComponent } from './_components/order-invoice/order-invoice.component';
import { AccountManagementComponent } from './_components/account-management/account-management.component';
import { OrderSearchPipe } from './_pipes/order-search.pipe';
import { SearchHighlightDirective } from './_directive/search-highlight.directive';
import { LoginComponent } from './_components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    DistributorComponent,
    DistributorsListComponent,
    AddDistributorComponent,
    ProductInvetoryComponent,
    OrderManagementComponent,
    OrderInvoiceComponent,
    AccountManagementComponent,
    OrderSearchPipe,
    SearchHighlightDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
