import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicePickPage } from './device-pick';

@NgModule({
  declarations: [
    DevicePickPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicePickPage),
  ],
  exports: [
    DevicePickPage
  ]
})
export class DevicePickPageModule {}
