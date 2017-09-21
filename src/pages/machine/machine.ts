import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

//Models
import { Machine } from './../../Models/machine';

//Services
import { ServiceRequestProvider, StorageProvider} from './../../providers/index.providers';

@IonicPage({
  name: 'MachinePage',
  segment: 'machines/:serial_number',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-machine',
  templateUrl: 'machine.html',
  providers: [ServiceRequestProvider],
})
export class MachinePage {

  public machine = new Machine;
  public serviceRequestForm:FormGroup;
  public equipoForm :FormGroup;
  public tipoDeSolicitud:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ServiceRequest:ServiceRequestProvider,
    private toastCtrl: ToastController,
    private _storage: StorageProvider,
    private formBuilder: FormBuilder
  ) {

    this._ServiceRequest.machineVerification( navParams.get('serial_number') ).toPromise().then(result =>{
      if(result.found){
        let toast = this.toastCtrl.create({
          message: 'Máquina encontrada',
          duration: 1000,
          position: 'top'
        });
        toast.present();

        this.machine.serial_number = result.serial_number;
        this.machine.model = result.model;
        this.machine.icon = result.icon;

        this._storage.setData("machine_serial_number", this.machine.serial_number);

      }else{
        let toast = this.toastCtrl.create({
          message: 'Máquina no encontrada',
          duration: 842,
          position: 'middle'
        });
        toast.present();

        this.navCtrl.popToRoot();
      }
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: 'Se requiere conexión a internet',
        duration: 3500,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.popToRoot();
      console.log(error);
    });
  }

  ionViewDidLoad() {
    let toast = this.toastCtrl.create({
      message: 'Buscando Máquina',
      duration: 369,
      position: 'middle'
    });
    toast.present();
  }

  SolicitarToner(){
    this.serviceRequestForm = this.formBuilder.group({
      tipoDeSolicitud: 'Toner'
    });
    this.setEquipoFormValue();
  }

  SolicitarServTec(){
    this.serviceRequestForm = this.formBuilder.group({
      tipoDeSolicitud: 'Servicio Técnico'
    });
    this.setEquipoFormValue();
  }

  SolicitarConfig(){
    this.serviceRequestForm = this.formBuilder.group({
      tipoDeSolicitud: 'Configuración'
    });
    this.setEquipoFormValue();
  }

  setEquipoFormValue(){
    this.equipoForm = this.formBuilder.group({
          serie: this.machine.serial_number,
          modelo: this.machine.model,
          icono: this.machine.icon,
    });
    this.serviceRequestForm.addControl('equipo', this.equipoForm);

    this.navCtrl.push('RequestCharcsPage', this.serviceRequestForm);
  }

}
