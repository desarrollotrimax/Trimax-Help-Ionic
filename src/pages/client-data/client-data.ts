import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

// Ionic Pages
import { SendRequestPage } from './../send-request/send-request';

// Services
import { StorageProvider } from './../../providers/storage/storage';

// Models
import { Applicant } from './../../Models/applicant';

@Component({
  selector: 'page-client-data',
  templateUrl: 'client-data.html',
})
export class ClientDataPage {

  public serviceRequestForm :FormGroup;
  public clientDataForm:FormGroup;
  public SendRequestPage:any = SendRequestPage;
  public solicitante = new Applicant;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private _storage: StorageProvider
  ){
    this.serviceRequestForm = this.navParams.data;

    this.clientDataForm = formBuilder.group({
      nombre: [this.solicitante.firstName, [Validators.minLength(3), Validators.required] ],
      apellido: [this.solicitante.lastName, [Validators.minLength(3), Validators.required] ],
      celular: [this.solicitante.telephone, [Validators.minLength(7), Validators.required] ]
    });

    this.serviceRequestForm.addControl('solicitante', this.clientDataForm);

    this._storage.getData("solicitante").then(resp=>{
      if(resp){
        resp = JSON.parse(resp as string);
        this.solicitante = resp as Applicant;
      }
    });

  }
  setData(){
    this._storage.setData("solicitante", this.solicitante);
  }

}
