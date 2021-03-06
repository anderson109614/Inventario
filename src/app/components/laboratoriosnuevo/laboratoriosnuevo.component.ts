import { Component, OnInit } from '@angular/core';
import { LaboratoriosService } from 'src/app/servicios/laboratorios.service';
import { Persona } from 'src/app/models/Persona';
import { Laboratorio } from 'src/app/models/Laboratorio';
import { Router } from '@angular/router';
import {DependeciasService} from 'src/app/servicios/dependecias.service';
import {Dependencia} from 'src/app/models/Dependencia';
import {InformacionService} from 'src/app/servicios/informacion.service';
import {Informacion} from 'src/app/models/Informacion';
import {Infor} from 'src/app/models/Inf';
@Component({
  selector: 'app-laboratoriosnuevo',
  templateUrl: './laboratoriosnuevo.component.html',
  styleUrls: ['./laboratoriosnuevo.component.css']
})
export class LaboratoriosnuevoComponent implements OnInit {
  
  laboratoristas : any = [];
  laboratoristasAux : any = [];
  dependencias: any=[];
  dependenciasAux: any=[];
  informaciones:any=[];
  informacionesAux:any=[];
  constructor(private labServicio: LaboratoriosService, public router: Router,private depService:DependeciasService,private InfService:InformacionService) { }

  ngOnInit() {
    this.cargarLaboratoristas();
    this.cargarDependencias();
    this.cargarInformacion();
  }

  //Cargar datos Laboratoristas
  cargarLaboratoristas(){
    this.labServicio.getLaboratoristas().subscribe(
      res => {
        this.laboratoristas = res;
        console.log(res);
        this.laboratoristasAux = res;
        ;
      },
      err => console.log(err)
    );
  }

  //

  //Seleccionar Laboratorista
  nombresLaboratorista = '';
  idLaboratorista = "";
  onClickLaboratorista(id : number, nombres:string, apellidos : string){
    this.nombresLaboratorista = (<HTMLInputElement>document.getElementById("txt_Laboratorista")).value;
    this.nombresLaboratorista = nombres.toString() + " " + apellidos.toString();
    this.idLaboratorista = id.toString();
  }
  //

  //Guardar Laboratorista y Laboratorios
  guardarLaboratorista(){
    var cedulaN = (<HTMLInputElement>document.getElementById("txt_CedulaNL")).value;
    var nombresN = (<HTMLInputElement>document.getElementById("txt_NombresNL")).value;
    var apellidosN = (<HTMLInputElement>document.getElementById("txt_ApellidosNL")).value;
    var telefono=(<HTMLInputElement>document.getElementById("txt_Telefono")).value
    if(cedulaN.toString() == ""){
      alert("Ingresar Cédula");
    }else if(!this.validarCedula(cedulaN.toString())){
      alert("Nro Cédula no válida");
    }else if(nombresN.toString() == ""){
      alert("Ingresar Nombres");
    }else if(apellidosN.toString() == ""){
      alert("Ingresar Apellidos");
    }else if(telefono.toString() == ""){
      alert("Ingresar Telefono");
    }else{
      let laboratorista:Persona = {
        id : "",
        cedula: cedulaN,
        nombres: nombresN,
        apellidos: apellidosN,
        telefono:telefono,
        direccion: ""
      }

      console.log(laboratorista);
      this.labServicio.guardarLaboratorista(laboratorista).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          (<HTMLInputElement>document.getElementById("txt_Laboratorista")).value = res.nombres.toString() + " " + res.apellidos.toString();
          this.idLaboratorista = res.id.toString();
          this.cargarLaboratoristas();
          alert("Se guardo con éxito");
          this.limpiarTxtLaboratorista();
        },
        err => console.log(err)
      );



    }
  }

  onClickGuardarLaboratorio(){
    var nombreLaboratorioN = (<HTMLInputElement>document.getElementById("txt_NombreLaboratorio")).value;
    var descripcionLaboratorioN = (<HTMLInputElement>document.getElementById("txt_DescripcionLaboratorio")).value;
    var capacidadLaboratorioN = (<HTMLInputElement>document.getElementById("txt_CapacidadLaboratorio")).value;
    var ubicacionLaboratorioN = (<HTMLInputElement>document.getElementById("txt_UbicacionLaboratorio")).value;
    var laboratoristaN = this.idLaboratorista;

    if(nombreLaboratorioN.toString()==""){
      alert("Ingresar Nombre Laboratorio");
      (<HTMLInputElement>document.getElementById("txt_NombreLaboratorio")).focus();
    }else if(descripcionLaboratorioN.toString() == ""){
      alert("Ingrear Descripción");
      (<HTMLInputElement>document.getElementById("txt_DescripcionLaboratorio")).focus();
    }else if(capacidadLaboratorioN.toString() == ""){
      alert("Ingresar Capacidad Laboratorio");
      (<HTMLInputElement>document.getElementById("txt_CapacidadLaboratorio")).focus();
    }else if(ubicacionLaboratorioN.toString() == ""){
      alert("Ingresar Ubicación Laboratorio");
      (<HTMLInputElement>document.getElementById("txt_UbicacionLaboratorio")).focus();
    }else if(laboratoristaN.toString() == ""){
      alert("Seleccionar Laboratorista");
      (<HTMLInputElement>document.getElementById("txt_Laboratorista")).focus();
    }else if(this.idDependencia.toString() == ""){
      alert("Seleccionar Dependencia");
      
    }else{
      let laboratorio:Laboratorio = {
        id: 0,
        nombre : nombreLaboratorioN,
        descripcion : descripcionLaboratorioN,
        capacidad : Number.parseInt(capacidadLaboratorioN),
        ubicacion : ubicacionLaboratorioN,
        id_laboratorista : Number.parseInt(laboratoristaN),
        id_dependencia: Number.parseInt(this.idDependencia)
      }
      
      console.log(laboratorio);
      this.labServicio.guardarLaboratorio(laboratorio).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          this.guardarInformaciones(res.id);
          alert("Se guardo con éxito");

          this.limpiarTxtLaboratorio();
          this.router.navigate(['/laboratorios']);
        },
        err => console.log(err)
      );
    }

  }
  guardarInformaciones(id:number){
    var  len= this.InformacionesSelecionadas.length;
    
    for (var i = 0; i < len; i++) {

      this.guardadoinf(id.toString(), this.InformacionesSelecionadas[i].id);
   }


  }
  guardadoinf(idLab:string,idInf:string){
    let ing:Infor={
        lab:idLab,
        infId:idInf
    }
    
    this.InfService.GuardarInformacionLaboratorios(ing).subscribe(
      //res => console.log(res),
      res => {
        //this.limpiartxt();
        console.log(res);
        
      },
      err => console.log(err)
    );
  }

  //
  //Limpiar TXT
  limpiarTxtLaboratorista(){
    (<HTMLInputElement>document.getElementById("txt_CedulaNL")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombresNL")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidosNL")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombreDE")).value="";
    (<HTMLInputElement>document.getElementById("txt_DescripcionDE")).value="";
    (<HTMLInputElement>document.getElementById("txt_Telefono")).value="";
  }

  limpiarTxtLaboratorio(){
    (<HTMLInputElement>document.getElementById("txt_NombreLaboratorio")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DescripcionLaboratorio")).value = "";
    (<HTMLInputElement>document.getElementById("txt_CapacidadLaboratorio")).value = "";
    (<HTMLInputElement>document.getElementById("txt_UbicacionLaboratorio")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Laboratorista")).value = "";
  }
  //

   //ValidarCedula

   validarCedula(cedula: string) {

    if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  
  }

  //

  //Busqueda
     
  checkLaboratoristas($event: KeyboardEvent){
    this.laboratoristas=this.laboratoristasAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.laboratoristas.filter(laboratorista => laboratorista.cedula.toUpperCase().search(value.toUpperCase())==0 
                                           || laboratorista.nombres.toUpperCase().search(value.toUpperCase())==0 
                                           || laboratorista.apellidos.toUpperCase().search(value.toUpperCase())==0 );
    this.laboratoristas=result;
  }   
  checkDependencias($event: KeyboardEvent){
    this.dependencias=this.dependenciasAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.dependencias.filter(dependencia => dependencia.nombre.toUpperCase().search(value.toUpperCase())==0 
                                           || dependencia.Descripcion.toUpperCase().search(value.toUpperCase())==0 );
    this.dependencias=result;
    
  } 
  checkInformacion($event: KeyboardEvent){
    this.informaciones=this.informacionesAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.informaciones.filter(informacion => informacion.Nombre.toUpperCase().search(value.toUpperCase())==0 );
    this.informaciones=result;
    
  }
  //

  //Confirmar
  confirmar() {   
    if (confirm("¿Desea cancelar?")) {
      this.router.navigate(['/laboratorios']);
    } else {
      
    }
    
  }

  //
  nombreDependencia='';
  idDependencia='';
  onClickDependencia(id:string,nombre:string){
    this.nombreDependencia=nombre;
    this.idDependencia=id;
  }
  cargarDependencias(){
    this.depService.getDependencias().subscribe(
      res => {
        this.dependencias=res;
        //console.log('res');
        this.dependenciasAux=res;

        ;
      },
      err => console.log(err)
    );
  }
  cargarInformacion(){
    this.InfService.getInformacion().subscribe(
      res => {
        this.informaciones=res;
        //console.log('res');
        this.informacionesAux=res;

        ;
      },
      err => console.log(err)
    );
  }
  guardarDependencia(){
    var nombreD = (<HTMLInputElement>document.getElementById("txt_NombreDE")).value;
    var DescripcionD = (<HTMLInputElement>document.getElementById("txt_DescripcionDE")).value;
    

    if(nombreD.toString() == ""){
      alert("Ingresar Cédula");
    }else if(DescripcionD.toString() == ""){
      alert("Ingresar Nombres");
    }else{
      let laboratorista:Dependencia = {
        id : 0,
        nombre: nombreD,
        descripcion: DescripcionD
        
      }

      console.log(laboratorista);
      this.depService.GuardarDependencia(laboratorista).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          this.nombreDependencia=res.nombre;
          this.idDependencia = res.id.toString();
          this.cargarDependencias();
          this.limpiarTxtLaboratorista();
          alert("Se guardo con éxito");
        },
        err => {
          console.log(err);
          alert("Se produjo un error al guardar los datos");
        }
      );



    }
  }
  InformacionesSelecionadas:Informacion[]=[];
  onClickInformacion(id:string,nombre:string){
    let a:Informacion={
      id:id,
      nombre:nombre
    };
    this.InformacionesSelecionadas.push(a);
  }
  onClickQuitarInformacion(id:string,nombre:string){
    var n=0;
    var i=0;
    this.InformacionesSelecionadas.forEach(function (value) {
      if(value.id==id && value.nombre==nombre){
        n=i;
      }
      i++;
    }); 
    //console.log(n);
    this.InformacionesSelecionadas.splice(n,1);
  }
  guardarInformacion(){
    var nombreD = (<HTMLInputElement>document.getElementById("txt_NombreIN")).value;
    
    

    if(nombreD.toString() == ""){
      alert("Ingresar Cédula");
    }else{
      let laboratorista:Informacion = {
        id : '',
        nombre: nombreD,
       
        
      }

      console.log(laboratorista);
      this.InfService.GuardarInformacion(laboratorista).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          this.cargarInformacion();
          this.limpiarTxtLaboratorista();
          this.InformacionesSelecionadas.push(res);
          alert("Se guardo con éxito");
        },
        err => {
          console.log(err);
          alert("Se produjo un error al guardar los datos");
        }
      );



    }
  }

}
