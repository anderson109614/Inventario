import { Component, OnInit } from '@angular/core';
import { LaboratoriosService } from '../../servicios/laboratorios.service';
import { Persona } from 'src/app/models/Persona';
import { Laboratorio } from 'src/app/models/Laboratorio';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HorariosService} from '../../servicios/horarios.service'
@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  laboratorios: any = [];
  laboratoriosAux: any = [];

  laboratoriosA: any = [];
  laboratoristas: any = [];
  laboratoristasAux: any = [];
  fechaBus:string='';
 horas:any=[];
  constructor(private labServicio: LaboratoriosService,private serHorarios: HorariosService) { }

  ngOnInit() {
    this.cargarlaboratorios();
    this.cargarLaboratoristas();
    this.asignarActivacionBotones();
    this.cargarHOras();
  }
  cargarHOras() {
    this.serHorarios.getHoras().subscribe(
      res => {
        //console.log(res);
        this.horas = res;
        
      },
      err => console.log(err)
    );
  }
  //Cargar datos laboratorios
  cargarlaboratorios() {
    this.labServicio.getLaboratorios().subscribe(
      res => {
        this.laboratorios = res;
        console.log(res);
        this.laboratoriosAux = res;
        ;
      },
      err => console.log(err)
    );
  }

  cargarLaboratoristas() {
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

  //Busqueda
  checkLaboratorios($event: KeyboardEvent) {
    this.laboratorios = this.laboratoriosAux;

    let value = (<HTMLInputElement>event.target).value;
    const result = this.laboratorios.filter(laboratorio => laboratorio.nombre.toUpperCase().search(value.toUpperCase()) == 0
      || laboratorio.descripcion.toUpperCase().search(value.toUpperCase()) == 0
      || laboratorio.capacidad.toUpperCase().search(value.toUpperCase()) == 0
      || laboratorio.ubicacion.toUpperCase().search(value.toUpperCase()) == 0
      || laboratorio.nombres.toUpperCase().search(value.toUpperCase()) == 0
      || laboratorio.apellidos.toUpperCase().search(value.toUpperCase()) == 0);
    this.laboratorios = result;
  }


  //Obtener id laboratorio

  onClickLaboratorio(id: string) {
    this.labServicio.getLaboratorioId(id).subscribe(
      res => {
        this.laboratoriosA = res;
        console.log(res);
        (<HTMLInputElement>document.getElementById("txt_NombreLaboratorio")).value = this.laboratoriosA[0].nombre;
        (<HTMLInputElement>document.getElementById("txt_DescripcionLaboratorio")).value = this.laboratoriosA[0].descripcion;
        (<HTMLInputElement>document.getElementById("txt_CapacidadLaboratorio")).value = this.laboratoriosA[0].capacidad;
        (<HTMLInputElement>document.getElementById("txt_UbicacionLaboratorio")).value = this.laboratoriosA[0].ubicacion;
        (<HTMLInputElement>document.getElementById("txt_Laboratorista")).value = this.laboratoriosA[0].nombres + " " + this.laboratoriosA[0].apellidos;
        this.idLaboratorista = id.toString();
      },
      err => console.log(err)
    );
  }

  //Obtener datos laboratorista
  nombresLaboratorista = "";
  idLaboratorista = "";
  onClickLaboratorista(id: string, nombres: string, apellidos: string) {
    this.idLaboratorista = id.toString();
    this.nombresLaboratorista = nombres.toString() + " " + apellidos.toString();
  }

  //

  //Guardar laboratorista

  guardarLaboratorista() {
    var cedulaN = (<HTMLInputElement>document.getElementById("txt_CedulaNL")).value;
    var nombresN = (<HTMLInputElement>document.getElementById("txt_NombresNL")).value;
    var apellidosN = (<HTMLInputElement>document.getElementById("txt_ApellidosNL")).value;

    if (cedulaN.toString() == "") {
      alert("Ingresar Cédula");
    } else if (!this.validarCedula(cedulaN.toString())) {
      alert("Nro Cédula no válida");
    } else if (nombresN.toString() == "") {
      alert("Ingresar Nombres");
    } else if (apellidosN.toString() == "") {
      alert("Ingresar Apellidos");
    } else {
      let laboratorista: Persona = {
        id: "",
        cedula: cedulaN,
        nombres: nombresN,
        apellidos: apellidosN,
        telefono: "",
        direccion: ""
      }

      console.log(laboratorista);
      this.labServicio.guardarLaboratorista(laboratorista).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          this.nombresLaboratorista = res.nombres.toString() + " " + res.apellidos.toString();
          this.idLaboratorista = res.id.toString();
          this.cargarLaboratoristas();
          alert("Se guardo con éxito");
          this.limpiarTxtLaboratorista();
        },
        err => console.log(err)
      );

    }
  }

  //

  //Limpiar TXT
  limpiarTxtLaboratorista() {
    (<HTMLInputElement>document.getElementById("txt_CedulaNL")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NombresNL")).value = "";
    (<HTMLInputElement>document.getElementById("txt_ApellidosNL")).value = "";
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

  //Actualizar laboratorio

  actualizarLaboratorio(){
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
    }else{
      let laboratorio:Laboratorio = {
        id: this.laboratoriosA[0].id,
        nombre : nombreLaboratorioN,
        descripcion : descripcionLaboratorioN,
        capacidad : Number.parseInt(capacidadLaboratorioN),
        ubicacion : ubicacionLaboratorioN,
        id_laboratorista : Number.parseInt(laboratoristaN)
      }

      console.log(laboratorio);
      this.labServicio.actualizarLaboratorio(laboratorio).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          console.log(res);
          
          alert("Se actualizó con éxito");
          this.limpiarTxtLaboratorio();
          this.cargarlaboratorios();
        },
        err => console.log(err)
      );
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
  //

  //Eliminar laboratorio

  eliminarLaboratorio(id:string){
    if(this.confirmarEliminar()){
      this.labServicio.eliminarLaboratorio(id).subscribe(
        res => {
          //console.log(res);
          this.cargarlaboratorios();
          alert("Se elimino correctamente");
        },
        err => console.log(err)
        
      );
    
    }
  }

  //

  //Confirmar eliminar
  confirmarEliminar() {
    if (confirm("¿Esta seguro que desea eliminar?")) {
    
     return true;
    } else {
      return false;
    }
    
  }
  //

  VerTodo(){
    (<HTMLDivElement>document.getElementById("divTodo")).style.display="block";
    (<HTMLDivElement>document.getElementById("divDisponible")).style.display="none";
    this.cargarlaboratorios();
  }
  VerDisponibles(){
    (<HTMLDivElement>document.getElementById("divTodo")).style.display="none";
    (<HTMLDivElement>document.getElementById("divDisponible")).style.display="block";
  }
  asignarActivacionBotones() {
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        // var current = document.getElementsByClassName("active");
        //current[0].className = current[0].className.replace(" active", "");
        this.classList.toggle("active");


      });
    }
  }

  handleDateClick(arg) { // handler method
    this.fechaBus = arg.dateStr;
    //alert(s);
    (<HTMLDivElement>document.getElementById("divCalendario")).style.display="none";
    (<HTMLDivElement>document.getElementById("divHorario")).style.display="block";


  }
  limpiarSeleccionados(){
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
    }
  }
  BuscarDisponibles(){
    var btns = document.getElementsByClassName("active");
    var idHo='';
      for (var i = 0; i < btns.length; i++) {
        var dia = (<HTMLButtonElement>btns[i]).classList[0];
        var hor = (<HTMLButtonElement>btns[i]).classList[1];
        
        ///
        var id = '.';
        this.horas.forEach(function (value) {
          if (value.horario == hor && value.nombre == dia) {
            id += value.id;
          }
        });
        ///
        idHo+=id;
      }
      this.labServicio.getLaboratorioDisponibles(this.fechaBus,idHo).subscribe(
        res => {
          this.laboratorios = res;
          this.laboratoriosAux = res;
          (<HTMLDivElement>document.getElementById("divTodo")).style.display="block";
          (<HTMLDivElement>document.getElementById("divDisponible")).style.display="none";
          (<HTMLDivElement>document.getElementById("divCalendario")).style.display="block";
          (<HTMLDivElement>document.getElementById("divHorario")).style.display="none";
          this.limpiarSeleccionados();
          ;
        },
        err => console.log(err)
      );

  }
}
