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


    var btns = document.getElementsByClassName("btnA");

    for (var i = 0; i < btns.length; i++) {

      btns[i].addEventListener("click", function () {
        // var current = document.getElementsByClassName("active");
        //current[0].className = current[0].className.replace(" active", "");
        this.classList.toggle("active");
        // this.className += " active";

      });
    }
    this.cargarHorarios();

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
    });
  }

  clickGuardar() {
    var semana = <HTMLInputElement>document.getElementById("semana");
    console.log(semana.value);
    var hoy = new Date(semana.value);
    console.log(this.getMonday(hoy));
  }

  getMonday(date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }
  onSearchChange(searchValue: string): void {
    var lun=this.getMonday(new Date(searchValue));
    console.log(lun);


  }

}
