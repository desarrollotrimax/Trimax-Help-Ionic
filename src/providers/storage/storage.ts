import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {}

  setData(key:string, value:any):void{
    if(this.platform.is('cordova')){ //for mobile devices
      this.storage.set(key, JSON.stringify(value));
      console.log("Lo registré sin problemas");
      let resp = this.storage.get(key);
      console.log("Recuperé sin problemas");
      resp.then(val=>{
        console.log( JSON.parse(val) );
      });


    }else{ //for web browsers
      localStorage.setItem(key, JSON.stringify(value) );

    }
  }
  getData(key:string){
    let promise = new Promise( (resolve, reject)=>{
      let response:any;
      if(this.platform.is('cordova')){ //for mobile devices
        response = this.storage.get(key);
      }else{ //for web browsers
        response = localStorage.getItem(key);
      }
      resolve( response );
    });
    return promise;
  }

}
