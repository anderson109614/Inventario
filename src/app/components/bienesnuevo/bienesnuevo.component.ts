import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';

@Component({
  selector: 'app-bienesnuevo',
  templateUrl: './bienesnuevo.component.html',
  styleUrls: ['./bienesnuevo.component.css']
})



export class BienesnuevoComponent implements OnInit {

  bienes: any = [];
  tipobienes: any = [];
  monedas: any = [];
  actas: any = [];
  encargados: any = [];
  bodegas: any = [];

  bien: Bien

  constructor(private bienesService:BienesService) { }

  ngOnInit() {
    
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
      },
      err => console.log(err)
    );

    this.bienesService.getTipoBienes().subscribe(
      res => {
        this.tipobienes = res;
      },
      err => console.log(err)
    );

    this.bienesService.getTipoMoneda().subscribe(
      res => {
        this.monedas = res;
      },
      err => console.log(err)
    );

    this.bienesService.getActa().subscribe(
      res => {
        this.actas = res;
      },
      err => console.log(err)
    );
    
    this.bienesService.getEncargado().subscribe(
      res => {
        this.encargados = res;
      },
      err => console.log(err)
    );

    this.bienesService.getBodega().subscribe(
      res => {
        this.bodegas = res;
      },
      err => console.log(err)
    );

  }

  guardarNuevoBien(){
    this.bienesService.guardarBiene(this.bien)
  }


  clickMessage = '';
  onClickMe(id:string) {
    this.clickMessage = id.toString();

  }

  clickMessageBien = '';
  onClickMeBien(id:string) {
    this.clickMessageBien = id.toString();
  }

  clickMessageEncargado = '';
  onClickMeEncargado(id:string) {
    this.clickMessageEncargado = id.toString();
  }

  clickMessageBodega = '';
  onClickMeBodega(id:string) {
    this.clickMessageBodega = id.toString();
  }

  
  onClickGuardar() {
    
    var unit = (<HTMLInputElement>document.getElementById("txt_Codigo")).value; 
    var unitC = (<HTMLInputElement>document.getElementById("cbx_TipoBien")).value; 
    console.log(unit);
    console.log(unitC);
  }

}

