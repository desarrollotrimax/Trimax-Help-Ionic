import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestCharcsPage } from './request-charcs';

@NgModule({
  declarations: [
    RequestCharcsPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestCharcsPage),
  ],
  exports: [
    RequestCharcsPage
  ]
})
export class RequestCharcsPageModule {}
