import { Component, OnInit } from '@angular/core';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';
import { Persona } from '../../models/Persona';
@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  suministros: any = [];
  detalles: any = [];
  personas: any = [];
  constructor(private siministrosService: ServiciossuministrosService) { }
  idSuministroSeleccionado: string = '-1';
  ngOnInit() {
    this.cargarSuministros();
    this.cargarPersonas();
    this.siministrosService.getDetalles().subscribe(
      res => {
        this.detalles = res;
      },
      err => console.log(err)
    );


  }
  ///////////77
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
    var persona = (<HTMLInputElement>document.getElementById('txt_IdPersona_sun'))
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
          var persona = (<HTMLInputElement>document.getElementById('txt_IdPersona_sun'))
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
    console.log(per.cedula);
    return false
  }
  limpiarPersona() {
    (<HTMLInputElement>document.getElementById("txt_cedulaNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombreNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_TelefonoNP")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DireccionNP")).value = "";
  }


}
