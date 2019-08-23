import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoriosService } from '../../servicios/laboratorios.service';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  horarios: any = [];
  constructor(private labSer: LaboratoriosService, private rutaActiva: ActivatedRoute) { }
  idLab: string = this.rutaActiva.snapshot.params.idLab;
  ngOnInit() {



   // this.cargarHorarios();
    this.marcarFechaActual();
    this.asignacionDeClases();
    this.asignarActivacionBotones();
    this.cargarHorarios();
  }
  

  asignarActivacionBotones() {
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        // var current = document.getElementsByClassName("active");
        //current[0].className = current[0].className.replace(" active", "");
        this.classList.toggle("active");
        // this.className += " active";

      });
    }
  }

  cargarHorarios() {
    this.labSer.getHorarioLab(this.idLab).subscribe(
      res => {
        console.log(res);
        this.horarios = res;
        this.marcarHOrarios(res);
      },
      err => console.log(err)
    );
  }
  marcarHOrarios(res: any) {
    res.forEach(function (value) {
      var btns = document.getElementsByClassName(value.nombre + ' ' + value.horario);
      btns[0].classList.add("activeR");
      btns[0].classList.remove("successC");
      btns[0].classList.remove("zoom");
      (<HTMLButtonElement>btns[0]).style.pointerEvents = "none";
    });
  }

  clickGuardar() {

  }
  marcarFechaActual() {
    var hoy = new Date();
    (<HTMLInputElement>document.getElementById("semana")).value = this.armarFecha(hoy);
    (<HTMLInputElement>document.getElementById("semana")).min = this.armarFecha(hoy);
    this.cargarFechasDias(hoy);
    console.log(hoy);
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

  }
  asignacionDeClases(){
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {

      btns[i].className +=" successC zoom";      
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
    console.log(selec);
    console.log(lunHoy);
    if (selec.getTime() == lunHoy.getTime()) {
      console.log('si');
      this.estadoInicial();
      this.asignacionDeClases();
      
      for (var i = 1; i < dh; i++) {
        var btns = document.getElementsByClassName(dias[i]);
       
        for (var j = 0; j < btns.length; j++) {
          
          (<HTMLButtonElement>btns[j]).style.pointerEvents = "none";
          
        }

      }
      
      


    }else{
      console.log('no');
      this.estadoInicial();
      this.asignacionDeClases();
      var btns = document.getElementsByClassName("btnA");
       
      for (var j = 0; j < btns.length; j++) {
        
        (<HTMLButtonElement>btns[j]).style.pointerEvents =  "auto";
        
      }
      this.marcarHOrarios(this.horarios);
      
    
    }




  }
  estadoInicial(){
    var btns = document.getElementsByClassName("btnA");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("successC");
      btns[i].classList.remove("zoom");
      btns[i].classList.remove("active");
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

}
