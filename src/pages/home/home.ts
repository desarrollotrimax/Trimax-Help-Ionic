import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DevicePickPage, InfoPage } from './../index.pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  DevicePickPage:any = DevicePickPage;
  InfoPage:any = InfoPage;

  constructor(public navCtrl: NavController) {

  }

}
