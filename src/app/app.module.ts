import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

//App Elements
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

//Pages
import { HomePage, DevicePickPage, RequestCharcsPage, ClientDataPage, SendRequestPage, InfoPage } from '../pages/index.pages';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DevicePickPage,
    RequestCharcsPage,
    ClientDataPage,
    SendRequestPage,
    InfoPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
       backButtonText: '',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DevicePickPage,
    RequestCharcsPage,
    ClientDataPage,
    SendRequestPage,
    InfoPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
