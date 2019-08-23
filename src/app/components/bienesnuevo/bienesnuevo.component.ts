import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { RouterLink, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { Acta } from 'src/app/models/Acta';
import { Bodega } from 'src/app/models/Bodega';
import { con } from 'src/app/models/coneccion';

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
  
 

  //id acta, bien, encargado y bodega
  idActa = "";
  idBien = "";
  idEncargado = "";
  idBodega = "";
  
  constructor(private bienesService:BienesService, public router: Router) { }

  
  ngOnInit() {

    this.cargarBienes();
    this.cargarTipoBienes();
    this.cargarTipoMonedas();
    this.cargarActas();
    this.cargarEncargados();
    this.cargarBodegas();

  }

  //Cargar datos Bienes, Encargados, Actas, Bodegas, Tipo De bienes y tipo de monedas
  cargarBienes(){
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
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

  cargarTipoBienes(){
    this.bienesService.getTipoBienes().subscribe(
      res => {
        this.tipobienes = res;
      },
      err => console.log(err)
    );
  }

  cargarTipoMonedas(){
    this.bienesService.getTipoMoneda().subscribe(
      res => {
        this.monedas = res;
      },
      err => console.log(err)
    );
  }

  //

  //Seleccionar Acta, Bien padre, Encargado y Bodega
  clickMessage = '';
  onClickMe(id: string, nro_acta:string) {
    this.clickMessage = nro_acta.toString();
    this.idActa = id.toString();

  }

  clickMessageBien = '';
  onClickMeBien(id:string, serie_identificacion: string) {
    this.clickMessageBien = serie_identificacion.toString();
    this.idBien = id.toString();
  }

  clickMessageEncargado = '';
  onClickMeEncargado(id:string, nombres:string, apellidos:string) {
    this.clickMessageEncargado = nombres.toString() + " " + apellidos.toString();
    this.idEncargado = id.toString();
  }

  clickMessageBodega = '';
  onClickMeBodega(id:string, nombre:string) {
    this.clickMessageBodega = nombre.toString();
    this.idBodega = id.toString();
  }
  //

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

 //Guardar Encargado, Acta y Bodega
  onClickGuardarEncargado(){
    var CedulaE = (<HTMLInputElement>document.getElementById("txt_CedulaNE")).value;
    var NombresE = (<HTMLInputElement>document.getElementById("txt_NombreNE")).value;
    var ApellidosE = (<HTMLInputElement>document.getElementById("txt_ApellidoNE")).value;

    if(CedulaE.toString()==""){
      alert("Ingresar Nro de Cédula");
    }else if(!this.validarCedula(CedulaE.toString())){
      alert("Nro de Cédula no válida");
    }else if(NombresE.toString() == ""){
      alert("Ingrese Nombres");
    }else if(ApellidosE.toString()==""){
      alert("Ingrese Apellidos");
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
        this.clickMessageEncargado = res.nombres.toString() + " " + res.apellidos.toString();
        this.idEncargado = res.id.toString();
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
          this.clickMessage = res.nro_acta.toString();
          this.idActa = res.id.toString();
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
          this.clickMessageBodega = res.nombre.toString();
          this.idBodega = res.id.toString();
          alert("Se guardo con éxito");
          this.limpiarTxtBodega();
          
        },
        err => console.log(err)
      );
    }

  }
  //

  //imagen
  base64textStringG = '';
  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textStringG = 'data:image/png;base64,' + btoa(e.target.result);
    //console.log(this.base64textStringG);
  }


  //
  //Guardar Bien
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
    var actaO = this.idActa; 
    var fechaIngresoO = (<HTMLInputElement>document.getElementById("txt_FechaIngreso")).value;
    var bienO = this.idBien;
    var idBienPadre; 
    if(bienO.toString() == ""){
    idBienPadre = "null";
    }else{
    idBienPadre = bienO;
    }  
    var encargadoO = this.idEncargado;
    var BodegaO = this.idBodega;
    var img_bienO =  this.base64textStringG;
   
    if(identificadorO.toString() == ""){
      alert("Ingresar Identificador");
      (<HTMLInputElement>document.getElementById("txt_Identificador")).focus();
    }else if(codigoO.toString() == ""){
      alert("Ingresar Código");
      (<HTMLInputElement>document.getElementById("txt_Codigo")).focus();
    }else if(serieO.toString() == ""){
      alert("Ingresar Serie");
      (<HTMLInputElement>document.getElementById("txt_Serie")).focus();
    }else if(modeloO.toString() == ""){
      alert("Ingresar Modelo");
      (<HTMLInputElement>document.getElementById("txt_Modelo")).focus();
    }else if(marcaO.toString() == ""){
      alert("Ingresar Marca");
      (<HTMLInputElement>document.getElementById("txt_Marca")).focus();
    }else if(colorO.toString() ==""){
      alert("Ingresar Color");
      (<HTMLInputElement>document.getElementById("txt_Color")).focus();
    }else if(materialO.toString()==""){
      alert("Ingresar Material");
      (<HTMLInputElement>document.getElementById("txt_Material")).focus(); 
    }else if(dimensionesO.toString() == ""){
      alert("Ingresar Dimensiones");
      (<HTMLInputElement>document.getElementById("txt_Dimensiones")).focus(); 
    }else if(valorCompraO.toString() == ""){
      alert("Ingresar Valor de Compra");
      (<HTMLInputElement>document.getElementById("txt_ValorCompra")).focus(); 
    }else if(actaO.toString()== ""){
      alert("Seleccionar el Nro de Acta");
      (<HTMLInputElement>document.getElementById("txt_NroActa")).focus(); 
    }else if(fechaIngresoO.toString()==""){
      alert("Seleccionar Fecha de Ingreso");
      (<HTMLInputElement>document.getElementById("txt_FechaIngreso")).focus();
    }else if(encargadoO.toString()==""){
      alert("Seleccionar el Encargado");
      (<HTMLInputElement>document.getElementById("txt_Encargado")).focus();
    }else if(BodegaO.toString()==""){
      alert("Seleccionar la Bodega");
      (<HTMLInputElement>document.getElementById("txt_Bodega")).focus();
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
        id_encargado: Number.parseInt(encargadoO),
        img_bien : img_bienO
      };
   
      console.log(bien);
  
      this.bienesService.guardarBiene(bien).subscribe(
        //res => console.log(res),
        res => {
          this.limpiartxt();
          console.log(res)
          alert("Se guardo con éxito");
          this.router.navigate(['/generarcodigoqr/',res.codigo]);
        },
        err => console.log(err)
      );

    }
    
  }

  //
  
  //Limpiar Txt
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
    (<HTMLInputElement>document.getElementById("txt_Img")).value = "";
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

  //
  // Mensaje Confirmar

  confirmar() {
    if (confirm("¿Desea cancelar?")) {
      this.router.navigate(['/listabienes']);
    } else {
      
    }
    
  }

  //

  //ValidarCedula
  
  validarCedula(cedula: string) {

    if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  
  }

  //
  

}

