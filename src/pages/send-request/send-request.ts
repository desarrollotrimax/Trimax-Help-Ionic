import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';

//Services
import { ServiceRequestProvider } from './../../providers/index.providers';

//Animaciones
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'page-send-request',
  templateUrl: 'send-request.html',
  providers: [ServiceRequestProvider],
  animations: [
    trigger('requestState', [
    state('active', style({opacity: 1})),
    state('inactive', style({opacity: 0})),
      transition('inactive => active', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translate3d(0, -200%, 0)'}),
          style({  opacity: 1, transform: 'none' })
        ]))
      ]),
      transition('active => inactive', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SendRequestPage {

  public serviceRequestForm :FormGroup;
  public requestState:string='inactive';
  public solicitudEnviada:boolean = false;
  public erroresDeEnvio;
  public tipoDeError;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public _ServiceRequest:ServiceRequestProvider,
    public loadingCtrl: LoadingController
    ) {

      this.serviceRequestForm = this.navParams.data;

      let loading = this.loadingCtrl.create({
        content: 'Enviando solicitud...'
      });
      loading.present();

      this._ServiceRequest.cccMailRequest(this.serviceRequestForm.value)
        .then(data=>{

          let respuesta =data.json();

          if( respuesta.mailSent ){
            this.solicitudEnviada= true;
          }else{
            this.tipoDeError = 'Error de parte del Servidor';
            this.erroresDeEnvio = respuesta.errors;
          }

          this.requestState='active';

          loading.dismiss();

        }).catch(error=>{
          this.tipoDeError = 'Error de parte del celular';
          this.erroresDeEnvio = error;

          this.requestState='active';
          loading.dismiss();

        });

  }
}
