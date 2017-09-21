import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, ValidatorFn,AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-request-charcs',
  templateUrl: 'request-charcs.html',
})
export class RequestCharcsPage {

  public serviceRequestForm :FormGroup;
  public tipoDeServicio:string;
  public aceptaColor:boolean;
  public charcsForm:FormGroup;
  public tintas:any = {'negra': false, 'cian': false, 'magenta': false,'amarilla': false};
  public contadores:any = {'negro': null, 'color': null};

  //public tipoPorFunciones:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.serviceRequestForm = this.navParams.data;
    this.tipoDeServicio = this.serviceRequestForm.get('tipoDeSolicitud').value;

    this.aceptaColor = this.serviceRequestForm.get('equipo').get('modelo').value.includes("C");

    switch( this.tipoDeServicio ) {
       case 'Toner':
             this.construirFormToToner();
           break;
       case 'Servicio Técnico':
             this.construirFormToServicioTecnico();
           break;
       case 'Configuración':
           this.construirFormToConfiguracion();
           break;
    }

  }

  private construirFormToToner(){

    if(this.aceptaColor){
      this.charcsForm = this.formBuilder.group({
        tintas : this.formBuilder.group({
          cian: this.tintas.cian,
          magenta: this.tintas.magenta,
          negra: this.tintas.negra,
          amarilla: this.tintas.amarilla,
        }),
        contadores: this.formBuilder.group({
          negro: [this.contadores.negro, this.minValue(1)],
          color: [this.contadores.color, this.minValue(1)],
        })
      });
    }else{
      this.tintas.negra = true;
      this.charcsForm = this.formBuilder.group({
        tintas : this.formBuilder.group({
          negra: this.tintas.negra,
        }),
        contadores: this.formBuilder.group({
          negro: [this.contadores.negro, this.minValue(1)],
        })
      });
    }
    this.serviceRequestForm.addControl('caracteristicas', this.charcsForm);

    this.charcsForm.controls.tintas.valueChanges.subscribe (term =>{

      this.validateCheckBoxes(term);

    });
  }

  private construirFormToServicioTecnico(){

    this.charcsForm = this.formBuilder.group({
      problema: ['', Validators.required],
      problemaEspecifico : '',
      contadores: this.formBuilder.group({
        negro: this.contadores.negro,
        color: this.contadores.color,
      })
    });

    this.serviceRequestForm.addControl('caracteristicas', this.charcsForm);
  }

  private construirFormToConfiguracion(){

    this.charcsForm = this.formBuilder.group({
      configuracionRequerida : ['', Validators.required],
      configuracionEspecifica : '',
      numeroDeUsuarios : [null, Validators.required],
    });

    this.serviceRequestForm.addControl('caracteristicas', this.charcsForm);
  }

  minValue(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      return (control.value < value) ? {'NoMinValue': {value: control.value}} : null;
    };
  }

  validateCheckBoxes(c:any) {

      let array = Object.keys(c).map(function(k) { return c[k] });

      let error = true;

      for (let i in array) {
        if (array[i])  error = false;
      }

      if(error){
        this.charcsForm.controls.tintas.setErrors ({atLeastOne: true});
      }else{
        this.charcsForm.controls.tintas.setErrors (null);
      }


    }


}
