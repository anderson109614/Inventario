import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { RouterLink, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { Acta } from 'src/app/models/Acta';
import { Bodega } from 'src/app/models/Bodega';

@Component({
  selector: 'app-bienesnuevo',
  templateUrl: './bienesnuevo.component.html',
  styleUrls: ['./bienesnuevo.component.css']
})



export class BienesnuevoComponent implements OnInit {

  bienes: any = [];
  bienesAux : any = [];
  tipobienes: any = [];
  monedas: any = [];
  actas: any = [];
  actasAux: any = [];
  encargados: any = [];
  encargadosAux : any = [];
  bodegas: any = [];
  bodegasAux: any = [];

  

  constructor(private bienesService:BienesService, public router: Router) { }

  ngOnInit() {
    
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
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

    this.cargarActas();
    
    this.cargarEncargados();

    this.cargarBodegas();

  }

  cargarEncargados()
  {
    this.bienesService.getEncargado().subscribe(
      res => {
        this.encargados = res;
        this.encargadosAux = res;
      },
      err => console.log(err)
    );
  }

  cargarActas()
  {
    this.bienesService.getActa().subscribe(
      res => {
        this.actas = res;
        this.actasAux = res;
      },
      err => console.log(err)
    );
  }

  cargarBodegas()
  {
    this.bienesService.getBodega().subscribe(
      res => {
        this.bodegas = res;
        this.bodegasAux = res;
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

  //Busqueda
  checkPinPersona($event: KeyboardEvent){
    this.encargados=this.encargadosAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.encargados.filter(encargado => encargado.cedula.toUpperCase().search(value.toUpperCase())==0 
                                                    || encargado.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                    || encargado.apellidos.toUpperCase().search(value.toUpperCase())==0 );
    this.encargados=result;

  }

  checkPinActas($event: KeyboardEvent){
    this.actas=this.actasAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.actas.filter(acta => acta.nro_acta.search(value)==0 
                                          || acta.origen.toUpperCase().search(value.toUpperCase())==0 
                                          || acta.nro_compromiso.search(value)==0 );
    this.actas=result;

  }

  checkPinBodega($event: KeyboardEvent){
    this.bodegas=this.bodegasAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.bodegas.filter(bodega => bodega.nombre.toUpperCase().search(value.toUpperCase())==0 
                                              || bodega.ubicacion.toUpperCase().search(value.toUpperCase())==0 );
    this.bodegas=result;

  }
  
  checkBien($event: KeyboardEvent) {

    this.bienes=this.bienesAux;
    
    let value = (<HTMLInputElement>event.target).value;
    const result = this.bienes.filter(bien => bien.codigo.search(value)==0 
                                           || bien.identificador.search(value)==0 
                                           || bien.serie_identificacion.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.modelo.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.marca.toUpperCase().search(value.toUpperCase())== 0 
                                           || bien.color.toUpperCase().search(value.toUpperCase())== 0
                                           || bien.material.toUpperCase().search(value.toUpperCase())== 0 );
    this.bienes=result;

  }

 //
  onClickGuardarEncargado(){
    var CedulaE = (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value;
    var NombresE = (<HTMLInputElement>document.getElementById("txt_NombreNE")).value;
    var ApellidosE = (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value;

    if(CedulaE.toString()==""){
      alert("Ingresar Nro de Cédula");
    }else{
      
    let encargado: Persona = {
      id: "",
      cedula: CedulaE,
      nombres: NombresE,
      apellidos: ApellidosE,
      telefono: "",
      direccion: ""
    };

    console.log(encargado);
    this.bienesService.guardarNuevoEncargado(encargado).subscribe(
      res => {
        //console.log(res);
        this.clickMessageEncargado = res.id.toString();
        this.cargarEncargados();      
        alert("Se guardo con éxito");       
        this.limpiarTxtEncargado();
      },
      err => console.log(err)
    );
    }

  }

  onClickGuardarActa(){
    var nroActaN = (<HTMLInputElement>document.getElementById("txt_NroActaNA")).value;
    var origenN = (<HTMLInputElement>document.getElementById("txt_OrigenNA")).value;
    var nro_compromisoN = (<HTMLInputElement>document.getElementById("txt_NroCompromisoNA")).value;
    var acta_contabilizadaN = (<HTMLInputElement>document.getElementById("cbx_ActaContabilizadaNA")).value;
    var bien_contabilizadoN = (<HTMLInputElement>document.getElementById("cbx_BienContabilizadoNA")).value;
    var descripcionN = (<HTMLInputElement>document.getElementById("txt_DescripcionNA")).value;

    if(nroActaN.toString()==""){
      alert("Ingresar Nro de Acta");
    }else if(origenN.toString() == ""){
      alert("Ingresar Origen");
    }else if(nro_compromisoN.toString() == ""){
      alert("Ingresar Nro de Compromiso");
    }else if(descripcionN.toString() == ""){
      alert("Ingrear descripción");
    }else{
      let acta:Acta = {
        id: 0,
        nro_acta: Number.parseInt(nroActaN), 
        origen: origenN, 
        nro_compromiso: Number.parseInt(nro_compromisoN),      
        acta_contabilizada: acta_contabilizadaN, 
        bien_contabilizado: bien_contabilizadoN, 
        descripcion: descripcionN
      }
  
      console.log(acta);
      this.bienesService.guardarNuevaActa(acta).subscribe(
        //res => console.log(res),
        res => {
          //this.limpiartxt();
          //console.log(res)
          this.clickMessage = res.id.toString();
          this.cargarActas();
          alert("Se guardo con éxito");
          this.limpiarTxtActa();
        },
        err => console.log(err)
      );
    }

  }

  onClickGuardarBodega(){
    var nombreBodegaN = (<HTMLInputElement>document.getElementById("txt_NombreBodegaNB")).value;
    var ubicacionN =(<HTMLInputElement>document.getElementById("txt_UbicacionNB")).value;

    if(nombreBodegaN.toString() == ""){
      alert("Ingresar Nombre de Bodega");
    }else if(ubicacionN.toString() == ""){
      alert("Ingresar Ubicación");
    }else{
      let bodega:Bodega={
        id: 0,
        nombre: nombreBodegaN,
        ubicacion: ubicacionN
      }
  
      console.log(bodega);
      this.bienesService.guardarNuevaBodega(bodega).subscribe(
        res => {
          //this.limpiartxt();
          console.log(res);
          this.cargarBodegas();
          this.clickMessageBodega = res.id.toString();
          alert("Se guardo con éxito");
          this.limpiarTxtBodega();
          
        },
        err => console.log(err)
      );
    }

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
    var idBienPadre; 
    if(bienO.toString() == ""){
    idBienPadre = "null";
    }else{
    idBienPadre = bienO;
    }  
    var encargadoO = (<HTMLInputElement>document.getElementById("txt_Encargado")).value; 
    var BodegaO = (<HTMLInputElement>document.getElementById("txt_Bodega")).value; 
   
    if(identificadorO.toString() == ""){
      (<HTMLInputElement>document.getElementById("txt_Identificador")).required;
      alert("Ingresar Identificador");
    }else if(codigoO.toString() == ""){
      (<HTMLInputElement>document.getElementById("txt_Codigo")).required;
      alert("Ingresar Código");
    }else if(serieO.toString() == ""){
      alert("Ingresar Serie");
    }else if(modeloO.toString() == ""){
      alert("Ingresar Modelo");
    }else if(marcaO.toString() == ""){
      alert("Ingresar Marca");
    }else if(colorO.toString() ==""){
      alert("Ingresar Color");
    }else if(materialO.toString()==""){
      alert("Ingresar Material");
    }else if(dimensionesO.toString() == ""){
      alert("Ingresar Dimensiones")
    }else if(valorCompraO.toString() == ""){
      alert("Ingresar Valor de Compra")
    }else if(actaO.toString()== ""){
      alert("Seleccionar el Nro de Acta")
    }else if(fechaIngresoO.toString()==""){
      alert("Seleccionar Fecha de Ingreso")
    }else if(encargadoO.toString()==""){
      alert("Seleccionar el Encargado")
    }else if(BodegaO.toString()==""){
      alert("Seleccionar la Bodega")
    }else{

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
        id_bien_padre: Number.parseInt(idBienPadre), 
        codigo: Number.parseInt(codigoO),
        id_encargado: Number.parseInt(encargadoO)
  
      };
   
      console.log(bien);
  
      this.bienesService.guardarBiene(bien).subscribe(
        //res => console.log(res),
        res => {
          this.limpiartxt();
          console.log(res)
          alert("Se guardo con éxito");
        },
        err => console.log(err)
      );

    }
    
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

  limpiarTxtActa(){
    (<HTMLInputElement>document.getElementById("txt_NroActaNA")).value = "";
    (<HTMLInputElement>document.getElementById("txt_OrigenNA")).value = "";
    (<HTMLInputElement>document.getElementById("txt_NroCompromisoNA")).value = "";
    (<HTMLInputElement>document.getElementById("cbx_ActaContabilizadaNA")).value = "";
    (<HTMLInputElement>document.getElementById("cbx_BienContabilizadoNA")).value = "";
    (<HTMLInputElement>document.getElementById("txt_DescripcionNA")).value = "";
  }

  limpiarTxtEncargado(){
   (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value = "";
   (<HTMLInputElement>document.getElementById("txt_NombreNE")).value = "";
   (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value = "";
  }

  limpiarTxtBodega(){
   (<HTMLInputElement>document.getElementById("txt_NombreBodegaNB")).value = "";
   (<HTMLInputElement>document.getElementById("txt_UbicacionNB")).value = "";
  }

  confirmar() {
    if (confirm("¿Desea cancelar?")) {
      this.router.navigate(['/listabienes']);
    } else {
      
    }
    
  }

}

