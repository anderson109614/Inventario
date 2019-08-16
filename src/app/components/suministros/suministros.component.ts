import { Component, OnInit } from '@angular/core';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import { Persona } from '../../models/Persona';
import { Suministro} from '../../models/Suministro';
@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  suministros: any = [];
  detalles: any = [];
  personas: any = [];
  unidades:any=[];
  constructor(private siministrosService: ServiciossuministrosService) { }
  idSuministroSeleccionado: string = '-1';
  ngOnInit() {
    this.cargarSuministros();
    this.cargarPersonas();
    this.cargarDEtalleTodo();
    this.cargarUnidades();

  }
  ///////////77
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
      },
      err => console.log(err)
    );
  }
  cargarSuministros() {
    this.siministrosService.getSuministro().subscribe(
      res => {
        this.suministros = res;
      },
      err => console.log(err)
    );
  }
  cargarPersonas() {
    this.siministrosService.getPersonas().subscribe(
      res => {
        this.personas = res;
      },
      err => console.log(err)
    );
  }

  onClickSuministro(id: string) {
    this.siministrosService.getDetallesId(id).subscribe(
      res => {
        //console.log(res);
        this.detalles = res;

      },
      err => console.log(err)
    );
    this.idSuministroSeleccionado = id;

  }
  onClickSelecPersona(id: string) {
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersonaNS'))
    persona.value = id;
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
          this.limpiarPersona();
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


}
