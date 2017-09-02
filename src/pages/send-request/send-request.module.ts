import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendRequestPage } from './send-request';

@NgModule({
  declarations: [
    SendRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(SendRequestPage),
  ],
  exports: [
    SendRequestPage
  ]
})
export class SendRequestPageModule {}
