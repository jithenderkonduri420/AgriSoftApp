import { LeakageComponent } from './modal-popup/leakage.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryboyIonvicePageRoutingModule } from './deliveryboy-ionvice-routing.module';

import { DeliveryboyIonvicePage } from './deliveryboy-ionvice.page';
import { ConfirmSubmissionComponent } from './modal-popup/confirm-submission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryboyIonvicePageRoutingModule
  ],
  declarations: [DeliveryboyIonvicePage, ConfirmSubmissionComponent, LeakageComponent]
})
export class DeliveryboyIonvicePageModule {}
