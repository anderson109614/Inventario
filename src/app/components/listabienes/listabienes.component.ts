import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';


@Component({
  selector: 'app-listabienes',
  templateUrl: './listabienes.component.html',
  styleUrls: ['./listabienes.component.css']
})

export class ListabienesComponent implements OnInit {

  bienes: any = [];
  bienesAuxs: any = [];

  constructor(private bienesService:BienesService) { }

  ngOnInit() {
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAuxs = res;
      },
      err => console.log(err)
    );
  }

  //////
  checkBien($event: KeyboardEvent) {

    this.bienes=this.bienesAuxs;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.bienes.filter(bien => bien.codigo.search(value)==0 
                                           || bien.identificador.search(value)==0 
                                           || bien.nombre.toUpperCase().search(value.toUpperCase())==0
                                           || bien.serie_identificacion.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.modelo.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.marca.toUpperCase().search(value.toUpperCase())== 0 
                                           || bien.color.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.material.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.cedula.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.nombres.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.apellidos.toUpperCase().search(value.toUpperCase())== 0 );
    this.bienes=result;

  }

}
