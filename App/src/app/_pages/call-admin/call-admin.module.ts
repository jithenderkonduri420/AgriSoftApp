import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallAdminPageRoutingModule } from './call-admin-routing.module';

import { CallAdminPage } from './call-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallAdminPageRoutingModule
  ],
  declarations: [CallAdminPage]
})
export class CallAdminPageModule {}
