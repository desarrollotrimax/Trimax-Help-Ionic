import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

//PlUG-INS
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Machine } from './../../Models/machine';

//Services
import { ServiceRequestProvider, StorageProvider} from './../../providers/index.providers';

import { RequestCharcsPage } from './../request-charcs/request-charcs';

// Observable operators
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@IonicPage()
@Component({
  selector: 'page-device-pick',
  templateUrl: 'device-pick.html',
  providers: [ServiceRequestProvider, BarcodeScanner],
})
export class DevicePickPage {

  public RequestCharcsPage:any = RequestCharcsPage;
  public serviceRequestForm :FormGroup;
  public equipoForm :FormGroup;

  private userInput = new Subject<string>();
  public APIrequest:any;

  public machine = new Machine;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private _ServiceRequest:ServiceRequestProvider,
              private barcodeScanner: BarcodeScanner,
              private platform: Platform,
              private toastCtrl: ToastController,
              private _storage: StorageProvider
            ) {

    this.serviceRequestForm = formBuilder.group({
      tipoDeSolicitud: this.navParams.get('solicitud')
    });

    this.equipoForm = formBuilder.group({
      serie: [this.machine.serial_number, [ Validators.required, Validators.minLength(5), Validators.maxLength(24) ]  ],
      modelo: this.machine.model,
      icono: this.machine.icon,
    });

    this.serviceRequestForm.addControl('equipo', this.equipoForm);

    this._storage.getData("machine_serial_number").then(resp=>{
      if(resp) this.machine.serial_number = this.sanitization( String(resp) );
    });

  }

  ngOnInit(): void {
    this.setWaitStage();
    this.equipoForm.controls.serie.valueChanges.subscribe (term =>{
      this.setWaitStage() ;
      term = this.sanitization(term); //Sanitize user input to an alphanumeric string
      this.userInput.next(term) ; // Push a search term into the observable stream.
    });

    this.APIrequest = this.userInput
      .filter(val => (val.length > 4) && (val.length < 25) ) // Filter requests only within a valid range of characters
      .debounceTime(369) // wait 369ms after each keystroke before considering the term
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap(term => term // switch to new observable each time the term changes
        // return the http search observable
        ? this._ServiceRequest.machineVerification(term)
        // or the observable of empty values if there was no search term
        : []
      ).subscribe((result) => {
        if(result.found){

          let toast = this.toastCtrl.create({
            message: 'Máquina encontrada',
            duration: 1000,
            position: 'top'
          });
          toast.present();

          this.machine.model = result.model;
          this.machine.icon = result.icon;
          this.equipoForm.controls.serie.setErrors (null);

          this._storage.setData("machine_serial_number", this.machine.serial_number);
        }
      },(error) => {
        let toast = this.toastCtrl.create({
          message: 'Se requiere conexión a internet',
          duration: 3500,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.pop();
      }, () => console.log("Completed!"));
  }
  get serie(){return this.equipoForm.get('serie');}

  setWaitStage(){
    this.equipoForm.controls.serie.setErrors ({notFound: true});
  }

  scan(){

    if(!this.platform.is('cordova')){
      console.log("QR scan only works on mobile devices");
      return ;
    }

    this.barcodeScanner.scan().then((barcodeData) => {

      if( (!barcodeData.cancelled) && (barcodeData.text!=null) ){
        let sn = barcodeData.text.split('http://help.trimaxsd.com/qr/machines/');

        if(sn[0]!=''){
          let toast = this.toastCtrl.create({
            message: 'Tu celular explotará en...',
            duration: 5000,
            position: 'middle'
          });
          toast.present();

          setTimeout(()=>{
            let toast = this.toastCtrl.create({
              message: '3',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }, 1000);

          setTimeout(()=>{
            let toast = this.toastCtrl.create({
              message: '2',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }, 2000);

          setTimeout(()=>{
            let toast = this.toastCtrl.create({
              message: '1',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }, 3000);

          setTimeout(()=>{
            let toast = this.toastCtrl.create({
              message: '¡PUM!',
              duration: 1693,
              position: 'bottom'
            });
            toast.present();
          }, 4000);

          setTimeout(()=>{
            let toast = this.toastCtrl.create({
              message: 'Te engañé, escanea un QR valido',
              duration: 2486,
              position: 'middle'
            });
            toast.present();
          }, 5000);
        }else{
          this.machine.serial_number = sn[1];
          let toast = this.toastCtrl.create({
            message: 'Buscando maquina',
            duration: 2486,
            position: 'bottom'
          });
          toast.present();
        }
        return ;

      }

     }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Error: '+ err,
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
     });

  }
  /*
    alphanumeric sanitization
  */
  sanitization(term:string){
    return term.replace(/[^A-Za-z0-9]/g, '');
  }

}
