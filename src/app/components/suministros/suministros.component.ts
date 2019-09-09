import { Component, OnInit } from '@angular/core';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import { Persona } from '../../models/Persona';
import { Suministro } from '../../models/Suministro';
import { Unidad } from '../../models/Unidad';
import { DetalleSuministro } from '../../models/DetalleSuministro';
declare var jQuery: any;
declare var $: any;
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
  unidades: any = [];
  idPersonaSelec: string = '';
  constructor(private siministrosService: ServiciossuministrosService) { }
  idSuministroSeleccionado: string = '-1';
  existenciaAnterior: string = '';

  ngOnInit() {
    this.cargarSuministros();
    this.cargarPersonas();
    this.cargarDEtalleTodo();
    this.cargarUnidades();

    (<HTMLButtonElement>document.getElementById("btn_add")).disabled = true;
    this.cargarFechaHora();

    //this.notifycacion('con en click');
    // $('#bb').quicksearch('#tt ');

    // $('input#bb').quicksearch('table tbody tr');

  }
  //

  //Busquedas
  checkPin($event: KeyboardEvent) {

    this.suministros = this.suministroAuxs;

    let value = (<HTMLInputElement>event.target).value;
    const result = this.suministros.filter(suministro => suministro.nombre.toUpperCase().search(value.toUpperCase()) == 0
      || suministro.existencia == value);
    this.suministros = result;

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
  checkPinDetalle($event: KeyboardEvent) {
    this.detalles = this.detallesAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.detalles.filter(detalle => detalle.nombres.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.apellidos.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.nombre.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.fecha.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.detalle.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.tipo_movimiento.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.NombreUnidad.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.cantidad.toUpperCase().search(value.toUpperCase()) == 0
      || detalle.existencia.toUpperCase().search(value.toUpperCase()) == 0
    );
    this.detalles = result;
  }
  //

  //Cargar datos
  cargarUnidades() {
    this.siministrosService.getUnidades().subscribe(
      res => {
        this.unidades = res;
        // console.log(res);
      },
      err => console.log(err)
    );
  }

  cargarDEtalleTodo() {
    this.siministrosService.getDetalles().subscribe(
      res => {
        this.detalles = res;
        this.detallesAux = res;
      },
      err => console.log(err)
    );
  }
  cargarSuministros() {
    this.siministrosService.getSuministro().subscribe(
      res => {
        this.suministros = res;
        this.suministroAuxs = res;
        this.notificarcionSuministros(res);
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
  //

  //Seleccionar 

  onClickSuministro(id: string, existencia: string) {
    (<HTMLButtonElement>document.getElementById("btn_add")).disabled = false;
    this.idSuministroSeleccionado = id; this.existenciaAnterior = existencia;
    this.siministrosService.getDetallesId(id).subscribe(
      res => {
        //console.log(res);
        this.detalles = res;
        this.detallesAux = res;

      },
      err => console.log(err)
    );
    this.idSuministroSeleccionado = id;

  }

  onClickSelecPersona(per: Persona) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = per.nombres + ' ' + per.apellidos;
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value = per.nombres + ' ' + per.apellidos;
    this.idPersonaSelec = per.id;


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
          persona.value = res.nombres + ' ' + res.apellidos;
          (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value = res.nombres + ' ' + res.apellidos;
          this.idPersonaSelec = res.id;
          this.cargarPersonas();
        },
        err => {
          alert('Error al guardar los datos de la Persona... intentelo nuevamente');
          console.log(err)
        }

      );
    }


  }
  //

  //Validar persona
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
  //



  //Guardar Suministro
  onClickGuardarSuministros() {
    var c = Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadNS")).value);
    let uni = (<HTMLSelectElement>document.getElementById("cbx_UnidadNuevo")).value;
    let sep = uni.split(':');
    let can = Number.parseInt(sep[1]);
    let sum: Suministro = {
      id: '',
      nombre: (<HTMLInputElement>document.getElementById("txt_NombreNS")).value,
      id_tipo_unidad: sep[0],
      cantidad: c,
      existencia: c * can,
      id_persona: this.idPersonaSelec,

    };
    if (this.verificarSuministro(sum)) {
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
  //

  //Verificar suministro
  verificarSuministro(sum: Suministro) {
    if (sum.nombre.length == 0) {
      alert('Ingrese un nombre para el suministro');
      return false;
    }

    if (sum.cantidad == 0 || sum.cantidad == null) {
      alert('Ingrese una cantidad');
      return false;
    }
    if (sum.id_persona.length == 0) {
      alert('Seleccione una persona');
      return false;
    }

    return true;
  }
  //

  //Limpiar 
  limpiadoSuministr() {
    (<HTMLInputElement>document.getElementById("txt_CantidadNS")).value = "";
    (<HTMLSelectElement>document.getElementById("cbx_UnidadNuevo")).options[0].selected = true;
    (<HTMLInputElement>document.getElementById("txt_NombreNS")).value = "";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value = "";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value = "";
  }

  limpiarPersona() {
    (<HTMLInputElement>document.getElementById("txt_cedulaNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombreNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_TelefonoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DireccionNP")).value = "";
  }

  limpiarUnidad() {
    (<HTMLInputElement>document.getElementById("txt_NombreNU")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CantidadNU")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DescripcionNU")).value = "";

  }

  limpiarDetalle() {
    (<HTMLSelectElement>document.getElementById("txt_delatalleND")).value = "";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CantidadND")).value = "";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNS")).value = "";
    (<HTMLInputElement>document.getElementById("txt_IdPersonaNDS")).value = "";
    this.idPersonaSelec = '';

  }

  limpiarActualizarSuministros() {
    (<HTMLSelectElement>document.getElementById("txt_NombreAS")).value = '';
    (<HTMLSelectElement>document.getElementById("txt_idAS")).value = '';
  }
  //

  //Guardar Unidad
  onClickGUardarUnidad() {
    let unid: Unidad = {
      id: '',
      nombre: (<HTMLInputElement>document.getElementById("txt_NombreNU")).value,
      cantidad: Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadNU")).value),
      descripcion: (<HTMLInputElement>document.getElementById("txt_DescripcionNU")).value
    };
    if (this.VerificarUnidad(unid)) {
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
  //

  //Verificar Unidad
  VerificarUnidad(uni: Unidad) {
    if (uni.nombre.length == 0) {
      alert('Ingrese un nombre de unidad');
      return false;
    }
    if (uni.descripcion.length == 0) {
      alert('Ingrese una descripcion para la unidad');
      return false;
    }
    if (uni.cantidad.toString().length == 0 || uni.cantidad == 0) {
      alert('Ingrese una cantidad valida');
      return false;
    }

    return true;
  }
  //

  //Guardar Detalle Suministro
  onClickGuardarDetalleSuministros() {
    var movi = (<HTMLSelectElement>document.getElementById("cbx_MovimientoND")).value;


    var c = Number.parseInt((<HTMLInputElement>document.getElementById("txt_CantidadND")).value);
    let uni = (<HTMLSelectElement>document.getElementById("cbx_UnidadNuevoND")).value;
    let sep = uni.split(':');
    let can = Number.parseInt(sep[1]);
    let exisA = Number.parseInt(this.existenciaAnterior);
    let uniAu = c * can;
    let exis = 0;

    if (movi == 'Ingreso') {
      exis = exisA + uniAu;
    } else {
      if (exisA >= uniAu) {
        exis = exisA - uniAu;
      } else {
        alert('Cantidad de Objetos insuficiente');
        return
      }
    }

    let detSun: DetalleSuministro = {
      id_suministro: this.idSuministroSeleccionado,
      fecha: (<HTMLSelectElement>document.getElementById("txt_FechaND")).value,
      detalle: (<HTMLSelectElement>document.getElementById("txt_delatalleND")).value,
      tipo_movimiento: movi,
      id_tipo_unidad: sep[0],
      cantidad: c,
      existencia: exis,
      id_persona: this.idPersonaSelec
    };
    console.log(detSun);
    if (this.VerificarDetalle(detSun)) {
      this.siministrosService.guardarDetalleSuministro(detSun).subscribe(
        res => {
          this.limpiarDetalle();
          this.limpiadoSuministr();
          console.log(res);
          this.cargarSuministros();
          this.onClickSuministro(res.id_suministro, res.existencia.toString());


        },
        err => {
          alert('Error al guardar los datos del Suministro... intentelo nuevamente');
          console.log(err)
        }

      );
    }

  }
  //

  //Verificar Detalle
  VerificarDetalle(det: DetalleSuministro) {
    if (det.detalle.length == 0) {
      alert('Ingrese un nombre de unidad');
      return false;
    }
    if (det.id_persona.length == 0) {
      alert('Seleccione una persona');
      return false;
    }
    if (det.cantidad.toString().length == 0 || det.cantidad < 0) {
      alert('Ingrese una cantidad valida');
      return false;
    }

    return true;
  }
  //

  //Editar Suministro
  onClickEditarsuministros(nombre: string, id: string) {
    //console.log(nombre +' '+id);
    (<HTMLSelectElement>document.getElementById("txt_NombreAS")).value = nombre;
    (<HTMLSelectElement>document.getElementById("txt_idAS")).value = id;
  }
  //

  //Actualizar suministro
  onClickGUardarActializarSuministro() {

    let sum: Suministro = {
      id: (<HTMLInputElement>document.getElementById("txt_idAS")).value,
      nombre: (<HTMLInputElement>document.getElementById("txt_NombreAS")).value,
      id_tipo_unidad: '1',
      cantidad: 1,
      existencia: 1,
      id_persona: 'aa',

    };
    if (this.verificarSuministro(sum)) {
      this.siministrosService.actualizarSuministro(sum).subscribe(
        res => {
          this.limpiadoSuministr();
          console.log(res);
          this.cargarSuministros();
          this.cargarDEtalleTodo();


        },
        err => {
          alert('Error al actializar los datos del Suministro... intentelo nuevamente');
          console.log(err)
        }

      );
    }
  }
  //

  //Notificacion
  notifycacion(msj: string) {

    if (!("Notification" in window)) {
      alert("Tu explorados no soporta las notificaciones de escritorio");
    } else if (Notification.permission === "granted") {

      var notification = new Notification(msj);
      /*
      notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://www.mozilla.org', '_blank');
      }*/
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {

        if (permission === "granted") {
          var notification = new Notification(msj);
        }
      });
    }
  }

  notificarcionSuministros(res: any) {
    var a = 0;
    res.forEach(function (value) {
      if (value.existencia < 10) {
        a++;
      }
    });
    if (a > 0) {
      this.notifycacion(a + ' Suministros se encuentran con menos de 10 unidades');
    }

  }
  //

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
   
    (<HTMLInputElement>document.getElementById("txt_FechaND")).value =h;
    
  }
}
