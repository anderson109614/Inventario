import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { RouterLink, Router } from '@angular/router';

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

  

  constructor(private bienesService:BienesService, public router: Router) { }

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
      id: 0,
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
    this.bienesService.guardarBiene(bien).subscribe(
      //res => console.log(res),
      res => {
        this.limpiartxt();
        console.log(res)
      },
      err => console.log(err)
    );
    
  }

  
  limpiartxt(){
    (<HTMLInputElement>document.getElementById("txt_Identificador")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Codigo")).value = "";  
    (<HTMLSelectElement>document.getElementById("cbx_TipoBien")).options[0].selected = true;
    (<HTMLInputElement>document.getElementById("txt_Serie")).value = ""; 
    (<HTMLInputElement>document.getElementById("txt_Modelo")).value = "";  
    (<HTMLInputElement>document.getElementById("txt_Marca")).value = ""; 
    (<HTMLInputElement>document.getElementById("txt_Color")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Material")).value = ""; 
    (<HTMLInputElement>document.getElementById("txt_Dimensiones")).value = ""; 
    (<HTMLSelectElement>document.getElementById("cbx_Critico")).options[0].selected = true;
    (<HTMLInputElement>document.getElementById("txt_ValorCompra")).value = ""; 
    (<HTMLSelectElement>document.getElementById("cbx_TipoMoneda")).options[0].selected = true;
    (<HTMLSelectElement>document.getElementById("cbx_Recompra")).options[0].selected = true;
    (<HTMLInputElement>document.getElementById("txt_NroActa")).value = ""; 
    (<HTMLInputElement>document.getElementById("txt_FechaIngreso")).value = "";
    (<HTMLInputElement>document.getElementById("txt_Bien")).value = "";  
    (<HTMLInputElement>document.getElementById("txt_Encargado")).value = ""; 
    (<HTMLInputElement>document.getElementById("txt_Bodega")).value = ""; 
  }

  confirmar() {
    if (confirm("¿Desea cancelar?")) {
      this.router.navigate(['/listabienes']);
    } else {
      
    }
    
  }

}

