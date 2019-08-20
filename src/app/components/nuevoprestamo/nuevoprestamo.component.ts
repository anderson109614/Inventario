import { Component, OnInit } from '@angular/core';
import {Persona} from '../../models/Persona';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import {BienesService} from '../../servicios/bienes.service';

@Component({
  selector: 'app-nuevoprestamo',
  templateUrl: './nuevoprestamo.component.html',
  styleUrls: ['./nuevoprestamo.component.css']
})
export class NuevoprestamoComponent implements OnInit {

  constructor(private siministrosService: ServiciossuministrosService,private bienesService:BienesService) { }
  personas: any = [];
  personasAux: any = [];
  encargados: any = [];
  encargadosAux : any = [];
  bienes: any=[];
  bienesAux: any=[];
  ngOnInit() {
    this.cargarPersonas();
    this.cargarEncargados();
    this.cargarBienes();
  }

  checkBien($event: KeyboardEvent) {

    this.bienes=this.bienesAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.bienes.filter(bien => bien.codigo.search(value)==0 
                                           || bien.identificador.search(value)==0 
                                           || bien.nombre.toUpperCase().search(value.toUpperCase())==0
                                           || bien.serie_identificacion.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.modelo.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.marca.toUpperCase().search(value.toUpperCase())== 0 
                                           || bien.color.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.material.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.cedula.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.nombres.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.apellidos.toUpperCase().search(value.toUpperCase())== 0 );
    this.bienes=result;

  }
  checkPinPersona($event: KeyboardEvent){
    this.personas=this.personasAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.personas.filter(persona => persona.cedula.toUpperCase().search(value.toUpperCase())==0 
                                                || persona.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                || persona.apellidos.toUpperCase().search(value.toUpperCase())==0
                                                || persona.telefono.toUpperCase().search(value.toUpperCase())==0 );
    this.personas=result;

  }
  checkPinEncargado($event: KeyboardEvent){
    this.encargados=this.encargadosAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.encargados.filter(encargado => encargado.cedula.toUpperCase().search(value.toUpperCase())==0 
                                                    || encargado.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                    || encargado.apellidos.toUpperCase().search(value.toUpperCase())==0 );
    this.encargados=result;

  }
  onClickSelecPersona(id: string) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = id;
   // (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value =id;
  }
  onClickGuardarPersona() {

    let per: Persona = {
      id: '0',
      cedula: (<HTMLInputElement>document.getElementById("txt_cedulaNP")).value,
      nombres: (<HTMLInputElement>document.getElementById("txt_NombreNP")).value,
      apellidos: (<HTMLInputElement>document.getElementById("txt_ApellidoNP")).value,
      telefono: (<HTMLInputElement>document.getElementById("txt_TelefonoNP")).value,
      direccion: (<HTMLInputElement>document.getElementById("txt_DireccionNP")).value
    };
    if (this.validarPErsona(per)) {
      this.siministrosService.guardarPersona(per).subscribe(
        res => {
          this.limpiarPersona();
          console.log(res);
          var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
          persona.value = res.id;
          //(<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value =res.id;
          this.cargarPersonas();
        },
        err => {
          alert('Error al guardar los datos de la Persona... intentelo nuevamente');
          console.log(err)
        }

      );
    }


  }
  validarPErsona(per: Persona) {
    /*
    var ced =(<HTMLInputElement>document.getElementById("txt_cedulaNP")).value;
    if(ced.length!=10){
      alert('Cedula Incorrecta');
      return false;
    }
    */
    if (per.cedula.length != 10) {
      alert('Cedula Incorrecta');
      return false;
    }
    if (per.nombres.length ==0) {
      alert('Ingrese Nombre');
      return false;
    }
    if (per.apellidos.length ==0) {
      alert('Ingrese Apellido');
      return false;
    }
    if (per.telefono.length <10) {
      alert('Ingrese Telefono');
      return false;
    }
    if (per.direccion.length ==0) {
      alert('Ingrese Direccion');
      return false;
    }
    return true;
  }
  limpiarPersona() {
    (<HTMLInputElement>document.getElementById("txt_cedulaNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombreNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_TelefonoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DireccionNP")).value = "";
  }
  cargarPersonas() {
    this.siministrosService.getPersonas().subscribe(
      res => {
        this.personas = res;
        this.personasAux=res;
      },
      err => console.log(err)
    );
  }
  cargarEncargados()
  {
    this.bienesService.getEncargado().subscribe(
      res => {
        this.encargados = res;
        this.encargadosAux = res;
      },
      err => console.log(err)
    );
  }
  clickMessageEncargado = '';
  onClickMeEncargado(id:string) {
    this.clickMessageEncargado = id.toString();
  }
  onClickGuardarEncargado(){
    var CedulaE = (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value;
    var NombresE = (<HTMLInputElement>document.getElementById("txt_NombreNE")).value;
    var ApellidosE = (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value;

    if(CedulaE.toString()==""){
      alert("Ingresar Nro de Cédula");
    }else{
      
    let encargado: Persona = {
      id: "",
      cedula: CedulaE,
      nombres: NombresE,
      apellidos: ApellidosE,
      telefono: "",
      direccion: ""
    };

    console.log(encargado);
    this.bienesService.guardarNuevoEncargado(encargado).subscribe(
      res => {
        //console.log(res);
        this.clickMessageEncargado = res.id.toString();
        this.cargarEncargados();      
        alert("Se guardo con éxito");       
        this.limpiarTxtEncargado();
      },
      err => console.log(err)
    );
    }

  }
  limpiarTxtEncargado(){
    (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombreNE")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value = "";
   }
  cargarBienes(){
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
      },
      err => console.log(err)
    );
  }
  onClickSeleccionaBien(id:string){
    var persona = (<HTMLInputElement>document.getElementById('txt_IdBien'))
    persona.value = id;
  }

  onClickGuardarNuevoPrestamo(){
      


  }

}
