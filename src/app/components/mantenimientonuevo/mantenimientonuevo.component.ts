import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/servicios/empresas.service';
import { Empresa } from 'src/app/models/Empresa';
import { Tecnico } from 'src/app/models/Tecnico';
import { TecnicosService } from 'src/app/servicios/tecnicos.service';
import { Mantenimiento } from 'src/app/models/Mantenimiento';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';

@Component({
  selector: 'app-mantenimientonuevo',
  templateUrl: './mantenimientonuevo.component.html',
  styleUrls: ['./mantenimientonuevo.component.css']
})
export class MantenimientonuevoComponent implements OnInit {

  tecnicos: any = [];
  tecnicosAux : any = [];
  empresas: any = [];
  empresasAux : any = [];

  constructor(private bienesService:BienesService, private empresasService:EmpresasService, private tecnicosService:TecnicosService,
    private mantenimientosService:MantenimientosService, private rutaActiva: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.cargarTecnicos();
    this.cargarEmpresas();
  }

  //Cargar datos 
  cargarTecnicos(){
    this.bienesService.getTecnico().subscribe(
      res => {
        this.tecnicos = res;
        this.tecnicosAux = res;    
        console.log(res);    
      },
      err => console.log(err)
    );
  }

  cargarEmpresas(){
    this.empresasService.getEmpresas().subscribe(
      res => {
        this.empresas = res;    
        this.empresasAux = res;
        console.log(res);    
      },
      err => console.log(err)
    );
  }

  //

  // Evento capturar id
 
  onClickMeTecnico(id:string) {
    var idTecnico = (<HTMLInputElement>document.getElementById("txt_Tecnico"));
    idTecnico.value = id.toString();
  }

  onClickMeEmpresa(id:string) {
    var idEmpresa = (<HTMLInputElement>document.getElementById("txt_Empresa"));
    idEmpresa.value = id.toString();
  }

  //

  //Guardar
  //Guardar Empresa
  onClickGuardarEmpresa(){
    var nombreN = (<HTMLInputElement>document.getElementById("txt_NombreNE")).value;
    var telefonoN = (<HTMLInputElement>document.getElementById("txt_TelefonoNE")).value;
    var direccionN = (<HTMLInputElement>document.getElementById("txt_DireccionNE")).value;
    var correo_electronicoN = (<HTMLInputElement>document.getElementById("txt_CorreoElectronicoNE")).value;

    if(nombreN.toString()==""){
      alert("Ingresar Nombre de la Empresa");
    }else if(telefonoN.toString() == ""){
      alert("Ingresar Teléfono");
    }else if(direccionN.toString() == ""){
      alert("Ingresar Dirección");
    }else if(correo_electronicoN.toString() == ""){
      alert("Ingrear Correo Electrónico");
    }else{
      let empresa:Empresa = {
        id: 0,
        nombre: nombreN,
        telefono: telefonoN,
        direccion : direccionN,
        correo_electronico: correo_electronicoN
      }
  
      console.log(empresa);
      this.empresasService.guardarNuevaEmpresa(empresa).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          //console.log(res)
          (<HTMLInputElement>document.getElementById("txt_Empresa")).value = res.id.toString();
          this.cargarEmpresas();
          alert("Se guardo con éxito");
          this.limpiarTxtEmpresa();
        },
        err => console.log(err)
      );
    }

  }
  //
  //Guardar Tecnico
  onClickGuardarTecnico(){
    var empresaN = (<HTMLInputElement>document.getElementById("txt_Empresa")).value;
    var cedulaN = (<HTMLInputElement>document.getElementById("txt_CedulaNT")).value;
    var nombresN = (<HTMLInputElement>document.getElementById("txt_NombresNT")).value;
    var apellidosN = (<HTMLInputElement>document.getElementById("txt_ApellidosNT")).value;
    

    if(empresaN.toString()==""){
      alert("Seleccione Empresa");
    }else if(cedulaN.toString() == ""){
      alert("Ingresar nro Cédula");
    }else if(nombresN.toString() == ""){
      alert("Ingresar Nombres");
    }else if(apellidosN.toString() == ""){
      alert("Ingresar Apellidos");
    }else{
      let tecnico:Tecnico = {
        id: 0,
        cedula: cedulaN,
        nombres: nombresN,
        apellidos: apellidosN,
        id_empresa: Number.parseInt(empresaN)
      }
  
      console.log(tecnico);
      this.tecnicosService.guardarNuevoTecnico(tecnico).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          //console.log(res)
          (<HTMLInputElement>document.getElementById("txt_Tecnico")).value = res.id.toString();
          this.cargarTecnicos();
          alert("Se guardo con éxito");
          this.limpiarTxtTecnico();
        },
        err => console.log(err)
      );
    }

  }
  //
  //Guardar Mantenimiento
  onClickGuardarMantenimiento(){
    var idBienN = this.rutaActiva.snapshot.params.id;
    var mantenimientoN = (<HTMLInputElement>document.getElementById("txt_Mantenimiento")).value;
    var descripcionN = (<HTMLInputElement>document.getElementById("txt_Descripcion")).value;
    var fechaN = (<HTMLInputElement>document.getElementById("txt_Fecha")).value;
    var tecnicoN = (<HTMLInputElement>document.getElementById("txt_Tecnico")).value;
    var estadoN = (<HTMLInputElement>document.getElementById("txt_Estado")).value;
    var observacionN = (<HTMLInputElement>document.getElementById("txt_Observacion")).value;
    

    if(mantenimientoN.toString()==""){
      alert("Ingrese Mantenimiento");
    }else if(descripcionN.toString() == ""){
      alert("Ingresar Descripción");
    }else if(fechaN.toString() == ""){
      alert("Selecionar Fecha");
    }else if(tecnicoN.toString() == ""){
      alert("Seleccionar Técnico");
    }else if(estadoN.toString()==""){
      alert("Ingresar Estado");
    }else if(observacionN.toString()==""){
      alert("Ingresar Observación");
    }else{
      let mantenimiento:Mantenimiento = {
        id: 0,
        id_bien: idBienN,
        mantenimiento : mantenimientoN,
        descripcion : descripcionN,
        fecha : fechaN,
        id_tecnico: Number.parseInt(tecnicoN),
        estado: estadoN, 
        observacion : observacionN
      }
  
      console.log(mantenimiento);
      this.mantenimientosService.guardarNuevoMantenimiento(mantenimiento).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          //console.log(res)
          //(<HTMLInputElement>document.getElementById("txt_Tecnico")).value = res.id.toString();
          //this.cargarTecnicos();
          alert("Se guardo con éxito");
          this.limpiarTxtMantenimiento();
        },
        err => console.log(err)
      );
    }

  }

  confirmar() {
    if (confirm("¿Desea cancelar?")) {
      this.router.navigate(['/listabienes']);
    } else {
      
    }
    
  }

  //

  //Busquedas
  checkTecnico($event: KeyboardEvent){
    this.tecnicos=this.tecnicosAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.tecnicos.filter(tecnico => tecnico.cedula.toUpperCase().search(value.toUpperCase())==0 
                                                || tecnico.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                || tecnico.apellidos.toUpperCase().search(value.toUpperCase())==0 
                                                || tecnico.nombre.toUpperCase().search(value.toUpperCase())==0);

                                     
    this.tecnicos=result;

  }

  checkEmpresa($event: KeyboardEvent){
    this.empresas=this.empresasAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.empresas.filter(empresa => empresa.nombre.toUpperCase().search(value.toUpperCase())==0 
                                                || empresa.telefono.toUpperCase().search(value.toUpperCase())==0 
                                                || empresa.direccion.toUpperCase().search(value.toUpperCase())==0 
                                                || empresa.correo_electronico.toUpperCase().search(value.toUpperCase())==0);

                                     
    this.empresas=result;

  }

  //


  //Limpiar textos
  limpiarTxtEmpresa(){
    (<HTMLInputElement>document.getElementById("txt_NombreNE")).value = "";
    (<HTMLInputElement>document.getElementById("txt_TelefonoNE")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DireccionNE")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CorreoElectronicoNE")).value = "";
  }

  limpiarTxtTecnico(){
    (<HTMLInputElement>document.getElementById("txt_Empresa")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CedulaNT")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombresNT")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidosNT")).value = "";
  }

  limpiarTxtMantenimiento(){
    (<HTMLInputElement>document.getElementById("txt_Mantenimiento")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Descripcion")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Fecha")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Tecnico")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Estado")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Observacion")).value = "";
  }

}
