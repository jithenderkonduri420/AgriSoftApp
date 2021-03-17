import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryboyIonvicePage } from './deliveryboy-ionvice.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryboyIonvicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryboyIonvicePageRoutingModule {}
