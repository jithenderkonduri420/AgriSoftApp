import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "../app/_components/dashboard/dashboard.component";
import { DistributorComponent } from "../app/_components/distributor/distributor.component";
import { DistributorsListComponent } from "../app/_components/distributors-list/distributors-list.component";
import { AddDistributorComponent } from "../app/_components/add-distributor/add-distributor.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'distributor', component: DistributorComponent },
  { path: 'distributors', component: DistributorsListComponent },
  { path: 'add-distributor', component: AddDistributorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
