import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import {Persona} from '../../models/Persona';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import {BienesService} from '../../servicios/bienes.service';
import {Prestamo} from '../../models/Prestamo';
import {PrestamosService} from '../../servicios/prestamos.service'
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-nuevoprestamo',
  templateUrl: './nuevoprestamo.component.html',
  styleUrls: ['./nuevoprestamo.component.css']
})
export class NuevoprestamoComponent implements OnInit {

  @ViewChild(QrScannerComponent, null) qrScannerComponent: QrScannerComponent;
  constructor(private siministrosService: ServiciossuministrosService,private bienesService:BienesService,private prestamosService:PrestamosService) { }
  personas: any = [];
  personasAux: any = [];
  encargados: any = [];
  encargadosAux : any = [];
  bienes: any=[];
  bienesAux: any=[];
  idPersona:string='';
  idEncargado:string='';
  idBien:string='';
  ngOnInit() {
    this.cargarPersonas();
    this.cargarEncargados();
    this.cargarBienes();
    this.iniciarCamara();
    this.cargarFechaHora();
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
  onClickSelecPersona(id: string,nom:string) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = nom;
    this.idPersona=id;
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
          persona.value = res.nombres+' '+res.apellidos;
          this.idPersona=res.id;
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
  onClickMeEncargado(id:string,nom:string) {
    this.idEncargado=id;
    this.clickMessageEncargado = nom;
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

    //console.log(encargado);
    this.bienesService.guardarNuevoEncargado(encargado).subscribe(
      res => {
        //console.log(res);
        this.clickMessageEncargado = res.nombres +' '+res.apellidos;
        this.idEncargado=res.id.toString();
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
    this.prestamosService.getBienes().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
      },
      err => console.log(err)
    );
  }
  onClickSeleccionaBien(id:string,nom:string){
    var persona = (<HTMLInputElement>document.getElementById('txt_IdBien'))
    persona.value = nom;
    this.idBien=id;
  }

  onClickGuardarNuevoPrestamo(){
      (<HTMLButtonElement>document.getElementById("btn_guardarPrestado")).disabled = true;
        let pre:Prestamo={
          id:'',
          id_persona_devolucion :'',
          fecha_hora_recibido  :'',
          observacion_recibido :'',
          id_bien:this.idBien,
          id_encargado_prestamo:this.idEncargado,
          id_persona_prestamo:this.idPersona,
          fecha_hora_entrega:(<HTMLInputElement>document.getElementById("txt_FechaNS")).value+" "+(<HTMLInputElement>document.getElementById("txt_HoraNS")).value,
          observacion_entrega:(<HTMLInputElement>document.getElementById('txt_ObservacionNS')).value
        };
        if(this.validarNuevoPrestamo(pre)){
          this.prestamosService.guardarPrestamo(pre).subscribe(
            res => {
              this.limpiarPersona();
              console.log(res);
              this.limpiar();
              alert('Datos Guardados correctamente');
              this.cargarFechaHora();
            },
            err => {
              alert('Error al guardar los datos del prestamo... intentelo nuevamente');
              console.log(err)
            }
    
          );
        }
        (<HTMLButtonElement>document.getElementById("btn_guardarPrestado")).disabled = false;


  }
  validarNuevoPrestamo(pre:Prestamo){
    if(pre.id_bien.length==0){
      alert('Seleccione un Bien');
      return false;
    }
    if(pre.id_encargado_prestamo.length==0){
      alert('Seleccione un Encargado');
      return false;
    }
    if(pre.id_persona_prestamo.length==0){
      alert('Seleccione una Persona');
      return false;
    }
    if(pre.fecha_hora_entrega.length<12){
      alert('Seleccione una Fecha y Hora validas');
      return false;
    }
    if(pre.observacion_entrega.length==0){
      alert('Ingrese una Observacion');
      return false;
    }
    return true;
  }
  limpiar(){
    (<HTMLInputElement>document.getElementById("txt_FechaNS")).value='';
    (<HTMLInputElement>document.getElementById("txt_HoraNS")).value='';
    (<HTMLInputElement>document.getElementById('txt_ObservacionNS')).value="";
    this.idBien='';
    this.idEncargado='';
    this.idPersona='';
    (<HTMLInputElement>document.getElementById("txt_IdBien")).value='';
    (<HTMLInputElement>document.getElementById("txt_Encargado")).value='';
    (<HTMLInputElement>document.getElementById('txt_IdPersonaNS')).value='';
  }

  //Cargar fecha
  cargarFechaHora() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var d=dd.toString();
    var m=mm.toString();
    if(dd<10){
      d='0'+dd;
    }
    if(mm<10){
      m='0'+mm;
    }
    var h=yyyy+'-'+m+'-'+d;
    var ho=hoy.getHours();
    var mi=hoy.getMinutes();
    var hos=ho.toString();
    var mis=mi.toString();
    if(ho<10){
      hos='0'+hos;
    }
    if(mi<10){
      mis='0'+mis;
    }
    var hora= hos+':'+mis;
   
    (<HTMLInputElement>document.getElementById("txt_FechaNS")).value =h;
    (<HTMLInputElement>document.getElementById("txt_HoraNS")).value =hora;
  }

  //Iniciar camara
  iniciarCamara() {
    console.log('Camara');
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.cargarDatos(result);
    });
  }

  //Cargar datos bien
  cargarDatos(codigo: string) {
    //alert(bien);

    this.bienesService.getBienCondigo(codigo.toString()).subscribe(
      res => {
        this.limpiarPersona();
        console.log(res);
        // console.log(res[0].id_persona_devolucion);
        //console.log( );
        if (Object.keys(res).length != 0) {
         // (<HTMLButtonElement>document.getElementById("btn_guargarQR")).disabled = false;
          (<HTMLInputElement>document.getElementById("txt_IdBien")).value = codigo;
        // (<HTMLInputElement>document.getElementById("txt_IdPersonaQR")).value = res[0].nombrePersonas + ' ' + res[0].apellidosPersona;
          this.idBien = res[0].id;
          console.log(res[0].id);
          //console.log(res.id_persona_devolucion);
        } else {
          alert('Bien no disponible');
         // (<HTMLButtonElement>document.getElementById("btn_guargarQR")).disabled = true;
         // (<HTMLInputElement>document.getElementById("txt_CodigoBienQR")).value = '';
         // (<HTMLInputElement>document.getElementById("txt_IdPersonaQR")).value = '';
         // this.idPersona = '';
        }



      },
      err => {
        alert('Error al intentar extraer datos del prestamo... intentelo nuevamente');
        //this.limpiarDevolucion();
        console.log(err)
      }

    );

  }
}
