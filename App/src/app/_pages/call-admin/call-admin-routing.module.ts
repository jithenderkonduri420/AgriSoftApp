import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallAdminPage } from './call-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CallAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallAdminPageRoutingModule {}
