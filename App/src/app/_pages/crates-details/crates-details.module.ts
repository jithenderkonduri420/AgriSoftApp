import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CratesDetailsPageRoutingModule } from './crates-details-routing.module';

import { CratesDetailsPage } from './crates-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CratesDetailsPageRoutingModule
  ],
  declarations: [CratesDetailsPage]
})
export class CratesDetailsPageModule {}
