import { Component, OnInit } from '@angular/core';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import { Persona } from '../../models/Persona';
import { Suministro} from '../../models/Suministro';
import { Unidad } from '../../models/Unidad';
import { DetalleSuministro} from '../../models/DetalleSuministro';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  suministros: any = [];
  suministroAuxs: any = [];
  detalles: any = [];
  detallesAux: any = [];
  personas: any = [];
  personasAux: any = [];
  unidades:any=[];
  constructor(private siministrosService: ServiciossuministrosService) { }
  idSuministroSeleccionado: string = '-1';
  existenciaAnterior:string='';
  
  ngOnInit() {
    this.cargarSuministros();
    this.cargarPersonas();
    this.cargarDEtalleTodo();
    this.cargarUnidades();
   // $('#bb').quicksearch('#tt ');
     
   // $('input#bb').quicksearch('table tbody tr');

  }
  ///////////77
  checkPin($event: KeyboardEvent) {

    this.suministros=this.suministroAuxs;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.suministros.filter(suministro => suministro.nombre.toUpperCase().search(value.toUpperCase())==0 
                                                      || suministro.existencia==value);
    this.suministros=result;

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
  checkPinDetalle($event: KeyboardEvent){
    this.detalles=this.detallesAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.detalles.filter(detalle => detalle.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                || detalle.apellidos.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.nombre.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.fecha.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.detalle.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.tipo_movimiento.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.NombreUnidad.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.cantidad.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.existencia.toUpperCase().search(value.toUpperCase())==0
                                                 );
    this.detalles=result;
  }

  /////7
  cargarUnidades(){
    this.siministrosService.getUnidades().subscribe(
      res => {
        this.unidades = res;
       // console.log(res);
      },
      err => console.log(err)
    );
  }

  cargarDEtalleTodo(){
    this.siministrosService.getDetalles().subscribe(
      res => {
        this.detalles = res;
        this.detallesAux=res;
      },
      err => console.log(err)
    );
  }
  cargarSuministros() {
    this.siministrosService.getSuministro().subscribe(
      res => {
        this.suministros = res;
        this.suministroAuxs=res;
      },
      err => console.log(err)
    );
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

  onClickSuministro(id: string,existencia:string) {
    this.idSuministroSeleccionado=id;
    this.existenciaAnterior=existencia;
    this.siministrosService.getDetallesId(id).subscribe(
      res => {
        //console.log(res);
        this.detalles = res;
        this.detallesAux=res;
        
      },
      err => console.log(err)
    );
    this.idSuministroSeleccionado = id;

  }
  onClickSelecPersona(id: string) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = id;
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value =id;
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
          (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value =res.id;
          this.cargarPersonas();
        },
        err => {
          alert('Error al guardar los datos de la Persona... intentelo nuevamente');
          console.log(err)
        }

      );
    }


  }
  private validarPErsona(per: Persona) {
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
  onClickGuardarSuministros(){
    var c=Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadNS")).value);
    let uni=(<HTMLSelectElement>document.getElementById("cbx_UnidadNuevo")).value;
    let sep= uni.split(':');
    let can=Number.parseInt(sep[1]);
    let sum:Suministro={
    id:'',
    nombre: (<HTMLInputElement>document.getElementById("txt_NombreNS")).value,
    id_tipo_unidad:sep[0],
    cantidad:c,
    existencia:c*can,
    id_persona:(<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value ,

    };
    if(this.verificarSuministro(sum)){
      this.siministrosService.guardarSuministro(sum).subscribe(
        res => {
          this.limpiadoSuministr();
          console.log(res);
          this.cargarSuministros();
          this.cargarDEtalleTodo();

  
        },
        err => {
          alert('Error al guardar los datos del Suministro... intentelo nuevamente');
          console.log(err)
        }
  
      );
    }
    
  }
  verificarSuministro(sum:Suministro){
    if (sum.nombre.length == 0) {
      alert('Ingrese un nombre para el suministro');
      return false;
    }

    if (sum.cantidad == 0 || sum.cantidad== null) {
      alert('Ingrese una cantidad');
      return false;
    }
    if (sum.id_persona.length ==0) {
      alert('Seleccione una persona');
      return false;
    }
    
      return true;
  }
  limpiadoSuministr(){
    (<HTMLInputElement>document.getElementById("txt_CantidadNS")).value="";
    (<HTMLSelectElement>document.getElementById("cbx_UnidadNuevo")).options[0].selected=true;
    (<HTMLInputElement>document.getElementById("txt_NombreNS")).value="";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value="";

  }

  onClickGUardarUnidad(){
     let unid:Unidad={
      id: '',
      nombre: (<HTMLInputElement>document.getElementById("txt_NombreNU")).value,
      cantidad:Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadNU")).value),
      descripcion:  (<HTMLInputElement>document.getElementById("txt_DescripcionNU")).value
     };
     if(this.VerificarUnidad(unid)){
      this.siministrosService.guardarUnidad(unid).subscribe(
        res => {
          console.log(res);
          this.cargarUnidades();

  
        },
        err => {
          alert('Error al guardar los datos de la Unidad... intentelo nuevamente');
          console.log(err)
        }
  
      );
     }

  }
  VerificarUnidad(uni: Unidad){
    if(uni.nombre.length==0){
      alert('Ingrese un nombre de unidad');
      return false;
    }
    if(uni.descripcion.length==0){
      alert('Ingrese una descripcion para la unidad');
      return false;
    }
    if(uni.cantidad.toString().length==0 || uni.cantidad==0){
      alert('Ingrese una cantidad valida');
      return false;
    }

    return true;
  }
  limpiarUnidad(){
    (<HTMLInputElement>document.getElementById("txt_NombreNU")).value="";
    (<HTMLInputElement>document.getElementById("txt_CantidadNU")).value="";
    (<HTMLInputElement>document.getElementById("txt_DescripcionNU")).value="";

  }

  onClickGuardarDetalleSuministros(){
    var movi=(<HTMLSelectElement>document.getElementById("cbx_MovimientoND")).value;


    var c=Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadND")).value);
    let uni=(<HTMLSelectElement>document.getElementById("cbx_UnidadNuevoND")).value;
    let sep= uni.split(':');
    let can=Number.parseInt(sep[1]);
    let exisA=Number.parseInt(this.existenciaAnterior);
    let uniAu=c*can;
    let exis=0;

    if(movi=='Ingreso'){
      exis=exisA+uniAu;
    }else{
      if(exisA>=uniAu){
        exis=exisA-uniAu;
      }else{
      alert('Cantidad de Objetos insuficiente');
      return
      }
    }

    let detSun:DetalleSuministro={
      id_suministro:this.idSuministroSeleccionado,
      fecha:(<HTMLSelectElement>document.getElementById("txt_FechaND")).value,
      detalle:(<HTMLSelectElement>document.getElementById("txt_delatalleND")).value,
      tipo_movimiento:movi,
      id_tipo_unidad:sep[0],
      cantidad:c,
      existencia:exis,
      id_persona:(<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value 
    };
    console.log(detSun);
    if(this.VerificarDetalle(detSun)){
      this.siministrosService.guardarDetalleSuministro(detSun).subscribe(
        res => {
          this.limpiarDetalle();
          this.limpiadoSuministr();
          console.log(res);
          this.cargarSuministros();
          this.onClickSuministro(res.id_suministro,res.existencia.toString());
          
  
        },
        err => {
          alert('Error al guardar los datos del Suministro... intentelo nuevamente');
          console.log(err)
        }
  
      );
    }

  }
  verificarSeleccion(){
    if(this.idSuministroSeleccionado!='-1'){
      (<HTMLButtonElement>document.getElementById("btn_GuarDetalleSumi")).disabled=false;
    }else{
      alert('Recuerde Seleccionar un suministro');
    }
  }
  VerificarDetalle(det:DetalleSuministro){
    if(det.detalle.length==0){
      alert('Ingrese un nombre de unidad');
      return false;
    }
    if(det.id_persona.length==0){
      alert('Seleccione una persona');
      return false;
    }
    if(det.cantidad.toString().length==0 || det.cantidad<0){
      alert('Ingrese una cantidad valida');
      return false;
    }

    return true;
  }
  limpiarDetalle(){
    (<HTMLSelectElement>document.getElementById("txt_delatalleND")).value="";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value ="";
    (<HTMLInputElement>document.getElementById("txt_CantidadND")).value ="";

  }



}
