import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "../app/_components/dashboard/dashboard.component";
import { DistributorComponent } from "../app/_components/distributor/distributor.component";
import { DistributorsListComponent } from "../app/_components/distributors-list/distributors-list.component";
import { AddDistributorComponent } from "../app/_components/add-distributor/add-distributor.component";
import { ProductInvetoryComponent } from "../app/_components/product-invetory/product-invetory.component";
import { OrderManagementComponent } from "../app/_components/order-management/order-management.component";
import { OrderInvoiceComponent } from "../app/_components/order-invoice/order-invoice.component";
import { AccountManagementComponent } from "../app/_components/account-management/account-management.component";
import { LoginComponent } from "../app/_components/login/login.component";
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'distributor/:id', component: DistributorComponent, canActivate: [AuthGuard] },
  { path: 'distributors', component: DistributorsListComponent, canActivate: [AuthGuard] },
  { path: 'add-distributor', component: AddDistributorComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductInvetoryComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderManagementComponent, canActivate: [AuthGuard] },
  { path: 'order-invoice', component: OrderInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountManagementComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
