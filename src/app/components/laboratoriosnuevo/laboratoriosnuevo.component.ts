import { Component, OnInit } from '@angular/core';
import { LaboratoriosService } from 'src/app/servicios/laboratorios.service';

@Component({
  selector: 'app-laboratoriosnuevo',
  templateUrl: './laboratoriosnuevo.component.html',
  styleUrls: ['./laboratoriosnuevo.component.css']
})
export class LaboratoriosnuevoComponent implements OnInit {

  laboratoristas : any = [];
  laboratoristasAux : any = [];

  constructor(private labServicio: LaboratoriosService) { }

  ngOnInit() {
    this.cargarLaboratoristas();
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
  onClickLaboratorista(id : number, nombres:string, apellidos : string){
    
  }
  //
}
