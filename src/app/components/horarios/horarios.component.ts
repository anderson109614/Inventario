import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoriosService } from '../../servicios/laboratorios.service';
import { HorariosService } from '../../servicios/horarios.service';
import { DetalleLab } from '../../models/DetalleLab';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Eventos } from '../../models/Eventos';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  laboratorioNom:string='';
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  eventosCalendario: any = [];
  horarios: any = [];
  prestados: any = [];
  horasE: any = [];
  horas: any = [];
  constructor(private labSer: LaboratoriosService, private rutaActiva: ActivatedRoute, private serHorarios: HorariosService) { }
  idLab: string = this.rutaActiva.snapshot.params.idLab;
  ngOnInit() {
    // this.cargarHorarios();
    this.marcarFechaActual();
    this.asignacionDeClases();
    this.asignarActivacionBotones();
    //this.cargarHorarios();
    this.cargarPrestados();
    this.cargarHOras(); 
    this.cargarEventosCalendario();
    // this.asignacionClickEliminar();
    this.cargarLaboratorio();

  }
  quitarliminar() {

    var btns = document.getElementsByClassName("badge");
    for (var i = 0; i < btns.length; i++) {

      (<HTMLButtonElement>btns[i]).style.display = 'none';
    }
  }
  cargarLaboratorio(){
    this.labSer.getLaboratorioId(this.idLab).subscribe(
      res => {
        //console.log(res[0].nombre);
        this.laboratorioNom=res[0].nombre;
        
      },
      err => console.log(err)
    );
  }
  del($event) {
    //console.log(<HTMLButtonElement>$event.path[0].classList);
    
    var idHor = (<HTMLButtonElement>$event.path[0]).classList[4];
    var idPre = (<HTMLButtonElement>$event.path[0]).classList[3];
    if (confirm('Seguro que desea eliminar...!!')) {
      this.eliminarPrestamos(idPre, idHor);
    }


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
  eliminarPrestamos(idPres: string, idHor: string) {
    this.labSer.delPrestamos(idPres, idHor).subscribe(
      res => {
        //console.log(res);
        //alert('Prestamo eliminado');
        this.estadoInicial();
        this.asignacionDeClases();
        this.cargarPrestados();

      },
      err => console.log(err)
    );
  }
  cargarHorarios() {
    this.labSer.getHorarioLab(this.idLab).subscribe(
      res => {
        //console.log(res);
        this.horarios = res;
        this.marcarHOrarios(res);
      },
      err => console.log(err)
    );
  }
  cargarPrestados() {
    var hoy = new Date((<HTMLInputElement>document.getElementById("semana")).value);
    var d = hoy.getUTCDay();
    if (d !== 1) {
      hoy = this.getMonday(hoy);
    }


    this.labSer.getPrestamos(this.idLab, this.armarFecha(hoy)).subscribe(
      res => {
        //console.log(res);
        this.prestados = res;
        this.marcarHOrarios(res);
      },
      err => console.log(err)
    );
  }
  marcarHOrarios(res: any) {
    res.forEach(function (value) {
      //console.log(value);
      var btns = document.getElementsByClassName(value.nombre + ' ' + value.horario);
      btns[0].classList.add("activeR");
      btns[0].classList.remove("active");
      btns[0].classList.remove("successC");
      btns[0].classList.remove("zoom");

      var bad = document.getElementsByClassName('badge ' + value.nombre + ' ' + value.horario);
      (<HTMLDivElement>bad[0]).style.display = 'block';

      (<HTMLDivElement>bad[0]).classList.add(value.id_prestamo);
      (<HTMLDivElement>bad[0]).classList.add(value.id_horario);
      (<HTMLButtonElement>btns[0]).style.pointerEvents = "none";
      (<HTMLButtonElement>btns[0]).innerHTML = value.Descripcion.toString().substring(0, 60);

    });
  }

  marcarFechaActual() {
    var hoy = new Date();
    (<HTMLInputElement>document.getElementById("semana")).value = this.armarFecha(hoy);
    (<HTMLInputElement>document.getElementById("semana")).min = this.armarFecha(hoy);
    this.cargarFechasDias(hoy);
    //console.log(hoy);
    this.bloquearAnteriores(hoy);
  }
  getMonday(date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }
  onSearchChange(searchValue: string): void {
    var lun = new Date(searchValue + ' 00:00:00');
    // console.log(lun);
    this.cargarFechasDias(lun);
    this.bloquearAnteriores(lun);
    this.cargarPrestados();

  }
  asignacionDeClases() {
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {

      btns[i].className += " successC zoom";
    }

  }
  bloquearAnteriores(selec: Date) {
    var dias = ["dom", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    var hoy = new Date();
    var lunHoy = this.getMonday(hoy);
    var h = new Date();
    var dh = h.getUTCDay();
    var d = selec.getUTCDay();
    if (d !== 1) {
      selec = this.getMonday(selec);
    }
    lunHoy.setHours(0, 0, 0, 0);
    selec.setHours(0, 0, 0, 0);
    //console.log(selec);
    //console.log(lunHoy);
    if (selec.getTime() == lunHoy.getTime()) {
      //console.log('si');
      this.estadoInicial();
      this.asignacionDeClases();

      for (var i = 1; i < dh; i++) {
        var btns = document.getElementsByClassName(dias[i]);

        for (var j = 0; j < btns.length; j++) {

          (<HTMLButtonElement>btns[j]).style.pointerEvents = "none";

        }

      }
    } else {
     // console.log('no');
      this.estadoInicial();
      this.asignacionDeClases();
      var btns = document.getElementsByClassName("btnA");

      for (var j = 0; j < btns.length; j++) {

        (<HTMLButtonElement>btns[j]).style.pointerEvents = "auto";

      }
      this.marcarHOrarios(this.horarios);


    }




  }
  estadoInicial() {
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("successC");
      btns[i].classList.remove("zoom");
      btns[i].classList.remove("active");
      btns[i].classList.remove("activeR");
      (<HTMLButtonElement>btns[i]).style.pointerEvents = "auto";
      (<HTMLButtonElement>btns[i]).innerHTML = '';

    }
    this.quitarliminar();
    
    var btns = document.getElementsByClassName("badge");

    for (var j = 0; j < btns.length; j++) {

      (<HTMLButtonElement>btns[j]).style.pointerEvents = "auto";

    }
  }
  cargarFechasDias(lun: Date) {
    var d = lun.getUTCDay();
    //console.log(d);
    //var lun=hoy;
    //console.log(lun);
    if (d !== 1) {
      lun = this.getMonday(lun);

    }
    //console.log(lun);

    (<HTMLInputElement>document.getElementById("lblLunes")).innerHTML = "Lunes <br> " + this.armarFecha(lun);
    (<HTMLInputElement>document.getElementById("lblLunes")).value = this.armarFecha(lun);
    var ma = this.sumarDias(lun, 1);
    (<HTMLInputElement>document.getElementById("lblMartes")).innerHTML = "Martes <br> " + this.armarFecha(ma);
    (<HTMLInputElement>document.getElementById("lblMartes")).value = this.armarFecha(ma);
    var mi = this.sumarDias(ma, 1);
    (<HTMLInputElement>document.getElementById("lblMiercoles")).innerHTML = "Miercoles <br> " + this.armarFecha(mi);
    (<HTMLInputElement>document.getElementById("lblMiercoles")).value = this.armarFecha(mi);
    var ju = this.sumarDias(mi, 1);
    (<HTMLInputElement>document.getElementById("lblJueves")).innerHTML = "Jueves <br> " + this.armarFecha(ju);
    (<HTMLInputElement>document.getElementById("lblJueves")).value = this.armarFecha(ju);
    var vi = this.sumarDias(ju, 1);
    (<HTMLInputElement>document.getElementById("lblViernes")).innerHTML = "Viernes <br> " + this.armarFecha(vi);
    (<HTMLInputElement>document.getElementById("lblViernes")).value = this.armarFecha(vi);
    var sa = this.sumarDias(vi, 1);
    (<HTMLInputElement>document.getElementById("lblSabado")).innerHTML = "Sabado <br> " + this.armarFecha(sa);
    (<HTMLInputElement>document.getElementById("lblSabado")).value = this.armarFecha(sa);
    var dom = this.sumarDias(sa, 1);
    (<HTMLInputElement>document.getElementById("lblDomingo")).innerHTML = "Domingo <br> " + this.armarFecha(dom);
    (<HTMLInputElement>document.getElementById("lblDomingo")).value = this.armarFecha(dom);


  }

  sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  armarFecha(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var d = dd.toString();
    var m = mm.toString();
    if (dd < 10) {
      d = '0' + dd;
    }
    if (mm < 10) {
      m = '0' + mm;
    }
    var h = yyyy + '-' + m + '-' + d;
    return h;
  }

  clickGuardar() {
    var des = (<HTMLInputElement>document.getElementById('txtDescripcion')).value;
    if (des.length != 0) {
      var btns = document.getElementsByClassName("active");
      if (btns.length > 0) {
        var idCab = '0';
        let det: DetalleLab = {
          id: '',
          id_prestamo: '',
          id_horario: '',
          fecha: '',
          idLab: this.idLab,
          des: des
        };

        this.serHorarios.guardarCabecera(det).subscribe(
          res => {
            //console.log('res');

            idCab = res.id;
            this.guardarDetalle(res.id);


          },
          err => console.log(err)
        );
      } else {
        alert('Seleccione minimo una hora para reservar');
      }


    } else {
      alert('Ingrese una descripcion');
    }

    //console.log('resul id: '+Number.parseInt(idCab))




  }
  guardarDetalle(idCab: string) {
    if (Number.parseInt(idCab) > 0) {
      var btns = document.getElementsByClassName("active");
      for (var i = 0; i < btns.length; i++) {
        //console.log(i);
        //console.log((<HTMLButtonElement>btns[i]).classList[0]);
        var dia = (<HTMLButtonElement>btns[i]).classList[0];
        var hor = (<HTMLButtonElement>btns[i]).classList[1];
        var fec = (<HTMLInputElement>document.getElementById('lbl' + dia)).value;
        ///
        var id = '';
        this.horas.forEach(function (value) {
          if (value.horario == hor && value.nombre == dia) {
            id = value.id;
          }
        });
        ///
        let d: DetalleLab = {
          id: '',
          id_prestamo: idCab,
          id_horario: id,
          fecha: fec,
          idLab: '',
          des: ''
        };
        //GUardado
        this.serHorarios.guardarDetalles(d).subscribe(
          res => {
            //console.log('res');
            (<HTMLInputElement>document.getElementById('txtDescripcion')).value = '';
            //this.marcarFechaActual();

            this.estadoInicial();
            this.asignacionDeClases();
            this.cargarPrestados();

          },
          err => console.log(err)
        );



      }

    } else {
      alert('Error al guardar los datos.....!!');
    }
  }
  cargarHOras() {
    this.serHorarios.getHoras().subscribe(
      res => {
        //console.log(res);
        this.horas = res;
        this.horasE = res;
      },
      err => console.log(err)
    );
  }

  VerSemana() {
    var el = document.getElementById("Horario");
    var elC = document.getElementById("calendario");


    elC.style.display = 'none';
    el.style.display = 'block';


  }
  VerMes() {
    var el = document.getElementById("Horario");
    var elC = document.getElementById("calendario");

    el.style.display = 'none';
    elC.style.display = 'block';


  }
  handleDateClick(arg) { // handler method
    var s = arg.dateStr;
    var ds = new Date(s + ' 00:00:00');

    (<HTMLInputElement>document.getElementById("semana")).value = this.armarFecha(ds);
    //(<HTMLInputElement>document.getElementById("semana")).min = this.armarFecha(hoy);
    this.cargarFechasDias(ds);
    this.bloquearAnteriores(ds);
    this.cargarPrestados();
    //console.log(ds);
    this.VerSemana();
  }
  cargarEventosCalendario() {
    this.serHorarios.getTodosPRestamos(this.idLab).subscribe(
      res => {

        //console.log(res);
        this.eventosCalendario = res;
      },
      err => console.log(err)
    );

  }

}
