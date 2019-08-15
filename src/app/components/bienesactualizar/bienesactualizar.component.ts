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
  opciones: string[] = ["Si", "No"];

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

  onClickActualizar() {
    var idBien = this.rutaActiva.snapshot.params.id;
    var identificadorO = (<HTMLInputElement>document.getElementById("txt_Identificador")).value;
    var codigoO = (<HTMLInputElement>document.getElementById("txt_Codigo")).value;  
    var tipoBienO = (<HTMLInputElement>document.getElementById("cbx_TipoBien")).value;
    var serieO = (<HTMLInputElement>document.getElementById("txt_Serie")).value; 
    var modeloO = (<HTMLInputElement>document.getElementById("txt_Modelo")).value;  
    var marcaO = (<HTMLInputElement>document.getElementById("txt_Marca")).value; 
    var colorO = (<HTMLInputElement>document.getElementById("txt_Color")).value;
    var materialO = (<HTMLInputElement>document.getElementById("txt_Material")).value; 
    var dimensionesO = (<HTMLInputElement>document.getElementById("txt_Dimensiones")).value; 
    var criticoO = (<HTMLInputElement>document.getElementById("cbx_Critico")).value; 
    var valorCompraO = (<HTMLInputElement>document.getElementById("txt_ValorCompra")).value; 
    var tipoMonedaO = (<HTMLInputElement>document.getElementById("cbx_TipoMoneda")).value; 
    var recompraO = (<HTMLInputElement>document.getElementById("cbx_Recompra")).value; 
    var actaO = (<HTMLInputElement>document.getElementById("txt_NroActa")).value; 
    var fechaIngresoO = (<HTMLInputElement>document.getElementById("txt_FechaIngreso")).value;
    var bienO = (<HTMLInputElement>document.getElementById("txt_Bien")).value;  
    var encargadoO = (<HTMLInputElement>document.getElementById("txt_Encargado")).value; 
    var BodegaO = (<HTMLInputElement>document.getElementById("txt_Bodega")).value; 
   
    let bien: Bien = {
      id: idBien,
      identificador: Number.parseInt(identificadorO),
      id_tipo_bien: Number.parseInt(tipoBienO),
      serie_identificacion: serieO,
      modelo: modeloO,
      marca: marcaO,
      critico: criticoO,
      id_moneda: Number.parseInt(tipoMonedaO),
      valor_compra: Number.parseFloat(valorCompraO),
      recompra: recompraO,
      color: colorO,
      material: materialO,
      dimensiones: dimensionesO,
      id_bodega: Number.parseInt(BodegaO),
      id_acta: Number.parseInt(actaO),
      fecha_ingreso: fechaIngresoO,
      id_bien_padre: Number.parseInt(bienO),     
      codigo: Number.parseInt(codigoO),
      id_encargado: Number.parseInt(encargadoO),

    };
 
    console.log(bien);
    this.bienesService.actualizarBien(bien).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    
  }

}
