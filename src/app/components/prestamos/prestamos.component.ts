import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { PrestamosService } from '../../servicios/prestamos.service';
import { Persona } from '../../models/Persona';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import { Prestamo } from '../../models/Prestamo';
import { QrScannerComponent } from 'angular2-qrscanner';
@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  Prestamos: any = [];
  personas: any = [];
  personasAux: any = [];
  idDev: string = '';
  @ViewChild(QrScannerComponent, null) qrScannerComponent: QrScannerComponent;
  constructor(private prestamosService: PrestamosService, private siministrosService: ServiciossuministrosService) { }

  ngOnInit() {
    this.cargarBienesPrestados();
    this.cargarPersonas();
    //this.iniciarCamara();
  }

  iniciarCamara() {
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
  cargarFechaHora(){

  }
  cargarDatos(bien:string){
    //alert(bien);
    (<HTMLInputElement>document.getElementById("txt_CodigoBienQR")).value=bien;
    this.prestamosService.getPrestamosCodigo(bien.toString()).subscribe(
      res => {
        this.limpiarPersona();
        console.log(res);
        if(res ==null){
          (<HTMLInputElement>document.getElementById("txt_IdPersonaQR")).value = res.id_persona_devolucion;
          this.idPersona=res.id_persona_devolucion;
        }else{
          alert('No se a podido optener datos');
        }
        
        
        
      },
      err => {
        alert('Error al intentar extraer datos del prestamo... intentelo nuevamente');
        console.log(err)
      }

    );

  }
  onClickEntregar(id: string) {
    this.idDev = id;
  }
  checkPinPersona($event: KeyboardEvent) {
    this.personas = this.personasAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.personas.filter(persona => persona.cedula.toUpperCase().search(value.toUpperCase()) == 0
      || persona.nombres.toUpperCase().search(value.toUpperCase()) == 0
      || persona.apellidos.toUpperCase().search(value.toUpperCase()) == 0
      || persona.telefono.toUpperCase().search(value.toUpperCase()) == 0);
    this.personas = result;

  }
 idPersona:string='';
  onClickSelecPersona(id: string,nom: string) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = nom;
    var personaqr = (<HTMLInputElement>document.getElementById('txt_IdPersonaQR'))
    personaqr.value = nom;
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
          
          (<HTMLInputElement>document.getElementById("txt_IdPersonaQR")).value = res.nombres+' '+res.apellidos;
          this.idPersona=res.id;
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
    if (per.nombres.length == 0) {
      alert('Ingrese Nombre');
      return false;
    }
    if (per.apellidos.length == 0) {
      alert('Ingrese Apellido');
      return false;
    }
    if (per.telefono.length < 10) {
      alert('Ingrese Telefono');
      return false;
    }
    if (per.direccion.length == 0) {
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
  cargarBienesPrestados() {
    this.prestamosService.getPrestamosEstado('Prestado').subscribe(
      res => {
        console.log('Entro');
        console.log(res);
        this.Prestamos = res;

      },
      err => console.log(err)
    );
  }
  cargarPersonas() {
    this.siministrosService.getPersonas().subscribe(
      res => {
        this.personas = res;
        this.personasAux = res;
      },
      err => console.log(err)
    );
  }
  onClickGuardarDevolucion() {
    let pre: Prestamo = {
      id: this.idDev,
      id_persona_devolucion: this.idPersona,
      fecha_hora_recibido: (<HTMLInputElement>document.getElementById("txt_FechaNS")).value + " " + (<HTMLInputElement>document.getElementById("txt_HoraNS")).value,
      observacion_recibido: (<HTMLInputElement>document.getElementById("txt_ObservacionNS")).value,
      id_bien: '',
      id_encargado_prestamo: '',
      id_persona_prestamo: '',
      fecha_hora_entrega: '',
      observacion_entrega: ''

    }
    console.log(pre);
    if (this.validarDevolucion(pre)) {
      this.prestamosService.devolverPrestamo(pre).subscribe(
        res => {
          this.limpiarPersona();
          console.log(res);
          this.cargarBienesPrestados();
          this.limpiarDevolucion();
        },
        err => {
          alert('Error al guardar los datos de la Persona... intentelo nuevamente');
          console.log(err)
        }

      );
    }


  }
  validarDevolucion(pre: Prestamo) {
    if (pre.id_persona_devolucion.length == 0) {
      alert('Seleccione una persona');
      return false;
    }
    if (pre.observacion_recibido.length == 0) {
      alert('Ingrese una Observacion');
      return false;
    }
    if (pre.fecha_hora_recibido.length < 12) {
      alert('Ingrese una Fecha y Hora correctas');
      return false;
    }
    return true;
  }
  limpiarDevolucion() {
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value = '';
    (<HTMLInputElement>document.getElementById("txt_FechaNS")).value = '';
    (<HTMLInputElement>document.getElementById("txt_HoraNS")).value = '';
    (<HTMLInputElement>document.getElementById("txt_ObservacionNS")).value = '';
    (<HTMLInputElement>document.getElementById("txt_IdPersonaQR")).value = '';
    (<HTMLInputElement>document.getElementById("txt_FechaQR")).value = '';
    (<HTMLInputElement>document.getElementById("txt_HoraQR")).value = '';
    (<HTMLInputElement>document.getElementById("txt_ObservacionQR")).value = '';
  }

}
