import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { ActivatedRoute } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-bienesactualizar',
  templateUrl: './bienesactualizar.component.html',
  styleUrls: ['./bienesactualizar.component.css']
})
export class BienesactualizarComponent implements OnInit {

  bienesA: any;
  bienes: any = [];
  tipobienes: any = [];
  monedas: any = [];
  actas: any = [];
  encargados: any = [];
  bodegas: any = [];

  constructor(private bienesService:BienesService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    //var l= this.rutaActiva.snapshot.params.id;
    this.bienesService.getBienId(this.rutaActiva.snapshot.params.id).subscribe(
      res => {
        
       console.log(res);
       this.bienesA=res;
      },
      err => console.log(err)
    );

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

  //clickMessage = '';
  onClickMe(id:string) {
    //this.clickMessage = id.toString();
    var nroActa = (<HTMLInputElement>document.getElementById("txt_NroActa"));
    nroActa.value = id.toString();

  }

  onClickCombo(){
    var cTipo = (<HTMLSelectElement>document.getElementById("cbx_TipoBien"));
    cTipo.options.item(2).selected = true;
    //cTipo.options[0] = new Option("1");
  }
  
  onClickMeBien(id:string) {
    var idBien = (<HTMLInputElement>document.getElementById("txt_Bien"));
    idBien.value = id.toString();
  }

  onClickMeEncargado(id:string) {
    var idEncargado = (<HTMLInputElement>document.getElementById("txt_Encargado"));
    idEncargado.value = id.toString();
  }

  onClickMeBodega(id:string) {
    var idBodega = (<HTMLInputElement>document.getElementById("txt_Bodega"));
    idBodega.value = id.toString();
  }

}
