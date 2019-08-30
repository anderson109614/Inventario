import { Component, OnInit } from '@angular/core';
import { LaboratoriosService } from '../../servicios/laboratorios.service';
@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {
  laboratorios: any = [];
  laboratoriosAux: any = [];

  laboratorioAct: any = []; 

  constructor(private labServicio: LaboratoriosService) { }

  ngOnInit() {
    this.cargarlaboratorios();

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

  //

  //Busqueda
  checkLaboratorios($event: KeyboardEvent){
    this.laboratorios=this.laboratoriosAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.laboratorios.filter(laboratorio => laboratorio.nombre.toUpperCase().search(value.toUpperCase())==0 
                                           || laboratorio.descripcion.toUpperCase().search(value.toUpperCase())==0 
                                           || laboratorio.capacidad.toUpperCase().search(value.toUpperCase())==0
                                           || laboratorio.ubicacion.toUpperCase().search(value.toUpperCase())==0 
                                           || laboratorio.nombres.toUpperCase().search(value.toUpperCase())== 0
                                           || laboratorio.apellidos.toUpperCase().search(value.toUpperCase())== 0 );
    this.laboratorios=result;
  }


  //Obtener nombre e id laboratorio
  nombreLab = "";
  onClickLaboratorio(nombre:string,id:string){
    this.nombreLab = nombre;
    this.labServicio.getLaboratorioId(id).subscribe(
      res => {
        this.laboratorioAct = res;
        console.log(res);
        ;
      },
      err => console.log(err)
    );
  }

}
