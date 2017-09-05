import { SendRequestPage } from './../send-request/send-request';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-client-data',
  templateUrl: 'client-data.html',
})
export class ClientDataPage {

  public serviceRequestForm :FormGroup;
  public clientDataForm:FormGroup;
  public SendRequestPage:any = SendRequestPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.serviceRequestForm = this.navParams.data;

    //console.log(this.serviceRequestForm);

    this.clientDataForm = formBuilder.group({
      nombre: ['Alejandro', [Validators.minLength(3), Validators.required] ],
      apellido: ['Villalón', [Validators.minLength(3), Validators.required] ],
      celular: ['4432795470', [Validators.minLength(7), Validators.required] ]
    });

    this.serviceRequestForm.addControl('solicitante', this.clientDataForm);

    // console.log(this.serviceRequestForm);
    // console.log(this.serviceRequestForm.value);
    // console.log(this.serviceRequestForm.get('tipo').value);
    // console.log(this.serviceRequestForm.get('cliente'));



  }

}
