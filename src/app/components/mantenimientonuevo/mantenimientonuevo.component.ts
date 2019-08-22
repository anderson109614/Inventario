import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/servicios/empresas.service';
import { Empresa } from 'src/app/models/Empresa';
import { Tecnico } from 'src/app/models/Tecnico';
import { TecnicosService } from 'src/app/servicios/tecnicos.service';
import { Mantenimiento } from 'src/app/models/Mantenimiento';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';
import { con } from 'src/app/models/coneccion';

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
  tipomantenimientos : any = [];

  

  constructor(private bienesService:BienesService, private empresasService:EmpresasService, private tecnicosService:TecnicosService,
    private mantenimientosService:MantenimientosService, private rutaActiva: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.cargarTecnicos();
    this.cargarEmpresas();
    this.cargarTipoMantenimiento();
   
    var nombreTecnico = (<HTMLInputElement>document.getElementById("txt_Mno"));
    nombreTecnico.checked = true;
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

  cargarTipoMantenimiento(){
    this.mantenimientosService.getTipoMantenimiento().subscribe(
      res => {
        this.tipomantenimientos = res;
        console.log(res);    
      },
      err => console.log(err)
    );
  }

  //

  // Evento capturar id
 
  idTecnico = "";
  onClickMeTecnico(id:string, nombres:string, apellidos:string) {
    var nombreTecnico = (<HTMLInputElement>document.getElementById("txt_Tecnico"));
    nombreTecnico.value = nombres.toString() + " " + apellidos.toString();
    this.idTecnico = id.toString();
  }

  idEmpresa = "";
  onClickMeEmpresa(id:string, nombre:string) {
    var idEmpresa = (<HTMLInputElement>document.getElementById("txt_Empresa"));
    idEmpresa.value = nombre.toString();
    this.idEmpresa = id.toString();
  }

  //

  //Radio Button 
  onClickMantenimiento(){
    var rbsi = (<HTMLInputElement>document.getElementById("txt_Msi"));
    rbsi.checked = true;
    var rbno = (<HTMLInputElement>document.getElementById("txt_Mno"));
    rbno.checked = false;
   
    console.log( (<HTMLInputElement>document.getElementById("txt_Mno")).checked);
    this.bloquearTxt(true);
    
  }

  onclickCambiarRB(){
    var rbsi = (<HTMLInputElement>document.getElementById("txt_Msi"));
    rbsi.checked = false;
    var rbno = (<HTMLInputElement>document.getElementById("txt_Mno"));
    rbno.checked = true;

    
      this.bloquearTxt(false);
    
  }

  bloquearTxt(estado:boolean){
    (<HTMLInputElement>document.getElementById("txt_Mantenimiento")).disabled=estado;
    (<HTMLInputElement>document.getElementById("txt_Tecnico")).disabled=estado;
    (<HTMLButtonElement>document.getElementById("btn_Tecnico")).disabled=estado;
    (<HTMLInputElement>document.getElementById("txt_Estado")).disabled=estado;
    (<HTMLInputElement>document.getElementById("txt_Observacion")).disabled=estado;
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
          (<HTMLInputElement>document.getElementById("txt_Empresa")).value = res.nombre.toString();
          this.idEmpresa = res.id.toString();
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
    var empresaN = this.idEmpresa;
    var cedulaN = (<HTMLInputElement>document.getElementById("txt_CedulaNT")).value;
    var nombresN = (<HTMLInputElement>document.getElementById("txt_NombresNT")).value;
    var apellidosN = (<HTMLInputElement>document.getElementById("txt_ApellidosNT")).value;
    var telefonoN = (<HTMLInputElement>document.getElementById("txt_TelefonoNT")).value;
    var correoN = (<HTMLInputElement>document.getElementById("txt_CorreoNT")).value;
    

    if(empresaN.toString()==""){
      alert("Seleccione Empresa");
    }else if(cedulaN.toString() == ""){
      alert("Ingresar nro Cédula");
    }else if(nombresN.toString() == ""){
      alert("Ingresar Nombres");
    }else if(apellidosN.toString() == ""){
      alert("Ingresar Apellidos");
    }else if(telefonoN.toString() == ""){
      alert("Ingresar Teléfono");
    }else{
      let tecnico:Tecnico = {
        id: 0,
        cedula: cedulaN,
        nombres: nombresN,
        apellidos: apellidosN,
        id_empresa: Number.parseInt(empresaN),
        telefono : telefonoN,
        correo : correoN
      }
  
      console.log(tecnico);
      this.tecnicosService.guardarNuevoTecnico(tecnico).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          //console.log(res)
          (<HTMLInputElement>document.getElementById("txt_Tecnico")).value = res.nombres.toString() + " " + res.apellidos.toString();
          this.idTecnico = res.id.toString();
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
    var idTipoMantenimientoN = (<HTMLInputElement>document.getElementById("cbx_TipoMantenimiento")).value;
    var idBienN = this.rutaActiva.snapshot.params.id;
    var mantenimientoN = (<HTMLInputElement>document.getElementById("txt_Mantenimiento")).value;
    var descripcionN = (<HTMLInputElement>document.getElementById("txt_Descripcion")).value;
    var fechaN = (<HTMLInputElement>document.getElementById("txt_Fecha")).value;
    var tecnicoN = this.idTecnico;
    var estadoN = (<HTMLInputElement>document.getElementById("txt_Estado")).value;
    var observacionN = (<HTMLInputElement>document.getElementById("txt_Observacion")).value;
    var programadoSi = (<HTMLInputElement>document.getElementById("txt_Msi")).checked;

    if(programadoSi == true){

      let mantenimiento:Mantenimiento = {
        id: 0,
        id_bien: idBienN,
        mantenimiento : "",
        descripcion : descripcionN,
        fecha : fechaN,
        id_tecnico: "null",
        estado: "", 
        observacion : "",
        id_tipo_mantenimiento : idTipoMantenimientoN,
        programado : "SI"
      }
  
      console.log(mantenimiento);
      this.mantenimientosService.guardarNuevoMantenimiento(mantenimiento).subscribe(
        res => {
          alert("Se guardo con éxito");
          this.limpiarTxtMantenimiento();
        },
        err => console.log(err)
      );

    }else{
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
          id_tecnico:tecnicoN,
          estado: estadoN, 
          observacion : observacionN,
          id_tipo_mantenimiento : idTipoMantenimientoN,
          programado : "NO"
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
    (<HTMLInputElement>document.getElementById("txt_TelefonoNT")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CorreoNT")).value = "";
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
