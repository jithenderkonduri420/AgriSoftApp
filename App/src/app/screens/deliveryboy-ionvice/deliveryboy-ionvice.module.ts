import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryboyIonvicePageRoutingModule } from './deliveryboy-ionvice-routing.module';

import { DeliveryboyIonvicePage } from './deliveryboy-ionvice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryboyIonvicePageRoutingModule
  ],
  declarations: [DeliveryboyIonvicePage]
})
export class DeliveryboyIonvicePageModule {}
