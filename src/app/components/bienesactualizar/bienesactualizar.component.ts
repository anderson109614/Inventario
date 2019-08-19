import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { ActivatedRoute, Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Acta } from 'src/app/models/Acta';
import { Persona } from 'src/app/models/Persona';
import { Bodega } from 'src/app/models/Bodega';

@Component({
  selector: 'app-bienesactualizar',
  templateUrl: './bienesactualizar.component.html',
  styleUrls: ['./bienesactualizar.component.css']
})
export class BienesactualizarComponent implements OnInit {

  bienesA: any;
  bienes: any = [];
  bienesAux : any = [];
  tipobienes: any = [];
  monedas: any = [];
  actas: any = [];
  actasAux: any = [];
  encargados: any = [];
  encargadosAux: any = [];
  bodegas: any = [];
  bodegasAux: any = [];
  opciones: string[] = ["Si", "No"];

  constructor(private bienesService:BienesService, private rutaActiva: ActivatedRoute, public router: Router) { }

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

  cargarActas(){
    this.bienesService.getActa().subscribe(
      res => {
        this.actas = res;
        this.actasAux = res;
      },
      err => console.log(err)
    );
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
    var idBienPadre; 
    if(bienO == ""){
    idBienPadre = "null";
    }else{
    idBienPadre = bienO;
    }
     
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
      id_bien_padre: Number.parseInt(idBienPadre),     
      codigo: Number.parseInt(codigoO),
      id_encargado: Number.parseInt(encargadoO),

    };
 
    console.log(bien);
    this.bienesService.actualizarBien(bien).subscribe(
      res => {
        //console.log(res)
        alert("Se Actualizo con éxito");
        this.router.navigate(['/listabienes']);
      },
      err => console.log(err)
    );
    
  }

  //Busquedas

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
    console.log(value);
    const result = this.actas.filter(acta => acta.nro_acta.toUpperCase().search(value.toUpperCase())==0 
                                          || acta.origen.toUpperCase().search(value.toUpperCase())==0 
                                          || acta.nro_compromiso.toUpperCase().search(value.toUpperCase())==0 );
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

  onClickGuardarActa(){
    var nroActaN = (<HTMLInputElement>document.getElementById("txt_NroActaNA")).value;
    var origenN = (<HTMLInputElement>document.getElementById("txt_OrigenNA")).value;
    var nro_compromisoN = (<HTMLInputElement>document.getElementById("txt_NroCompromisoNA")).value;
    var acta_contabilizadaN = (<HTMLInputElement>document.getElementById("cbx_ActaContabilizadaNA")).value;
    var bien_contabilizadoN = (<HTMLInputElement>document.getElementById("cbx_BienContabilizadoNA")).value;
    var descripcionN = (<HTMLInputElement>document.getElementById("txt_DescripcionNA")).value;

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
        var nroActa = (<HTMLInputElement>document.getElementById("txt_NroActa"));
        nroActa.value = res.id.toString();

        this.cargarActas();
        alert("Se guardo con éxito");
        this.limpiarTxtActa();
      },
      err => console.log(err)
    );
  }

  
  onClickGuardarEncargado(){
    var CedulaE = (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value;
    var NombresE = (<HTMLInputElement>document.getElementById("txt_NombreNE")).value;
    var ApellidosE = (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value;

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
        var idEncargado = (<HTMLInputElement>document.getElementById("txt_Encargado"));
        idEncargado.value = res.id.toString();
        this.cargarEncargados();      
        alert("Se guardo con éxito");       
        this.limpiarTxtEncargado();
      },
      err => console.log(err)
    );
  }

  onClickGuardarBodega(){
    var nombreBodegaN = (<HTMLInputElement>document.getElementById("txt_NombreBodegaNB")).value;
    var ubicacionN =(<HTMLInputElement>document.getElementById("txt_UbicacionNB")).value;

    let bodega:Bodega={
      id: 0,
      nombre: nombreBodegaN,
      ubicacion: ubicacionN
    }

    console.log(bodega);
    this.bienesService.guardarNuevaBodega(bodega).subscribe(
      res => {
        //this.limpiartxt();
        //console.log(res);
        var idBodega = (<HTMLInputElement>document.getElementById("txt_Bodega"));
        idBodega.value = res.id.toString();
        this.cargarBodegas();
        alert("Se guardo con éxito");
        this.limpiarTxtBodega();
        
      },
      err => console.log(err)
    );
    
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
