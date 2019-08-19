import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mantenimientonuevo',
  templateUrl: './mantenimientonuevo.component.html',
  styleUrls: ['./mantenimientonuevo.component.css']
})
export class MantenimientonuevoComponent implements OnInit {

  tecnicos: any = [];

  constructor(private bienesService:BienesService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    
  }

  cargarTecnicos(){
    this.bienesService.getTecnico().subscribe(
      res => {
        this.tecnicos = res;    
        console.log(res);    
      },
      err => console.log(err)
    );
  }

}
