import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

//Variables de configuración
import { apiServer } from './../../config/backend-server';

@Injectable()
export class ServiceRequestProvider {

  constructor( public http: Http ) {

  }

  machineVerification(term:string){
    return this.http.get(apiServer+'api/machines/'+term)
    .map(response => response.json());
  }

  cccMailRequest(data:object){
    let jsonData = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    // this.http.get(apiServer)
    //   .subscribe(data => {
    //         console.log(data);
    //         alert(data);
    //     }, error => {
    //         console.log("Oooops!");
    //         alert('ERROR');
    //     });;

    // this.http.post(apiServer+'service-request/mailer', jsonData, options)
    //   .subscribe(data => {
    //         console.log(data.json());
    //     }, error => {
    //         console.log("Oooops!");
    //     });

    return this.http.post(apiServer+'service-request/mailer', jsonData, options).toPromise();
  }

}
