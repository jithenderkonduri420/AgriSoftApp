import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickPayPageRoutingModule } from './quick-pay-routing.module';

import { QuickPayPage } from './quick-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickPayPageRoutingModule
  ],
  declarations: [QuickPayPage]
})
export class QuickPayPageModule {}
