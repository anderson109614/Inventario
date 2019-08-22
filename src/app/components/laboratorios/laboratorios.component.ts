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
  constructor(private labServicio: LaboratoriosService) { }

  ngOnInit() {
    this.cargarlaboratorios();




  }
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

}
