import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../app/_pages/login/login.component";
import { DistributorComponent } from "../app/_components/distributor/distributor.component";
import { DistributorsListComponent } from "../app/_components/distributors-list/distributors-list.component";
import { AddDistributorComponent } from "../app/_components/add-distributor/add-distributor.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { path: 'distributor', component: DistributorComponent },
  { path: 'distributors', component: DistributorsListComponent },
  { path: 'add-distributor', component: AddDistributorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
