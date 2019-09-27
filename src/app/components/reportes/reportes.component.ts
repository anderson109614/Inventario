import { Component, OnInit } from '@angular/core';
import { BienesService } from '../../servicios/bienes.service';
import { ServiciossuministrosService } from '../../servicios/serviciossuministros.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
 
  bienes: any = [];
  bienesAux: any = [];
  encargados: any = [];
  encargadosAux: any = [];
  tipobienes: any = [];
  repoSEleccionado:number;
  suministros: any = [];
  suministroAuxs: any = [];

  constructor(private bienesService: BienesService,private siministrosService: ServiciossuministrosService) { }

  ngOnInit() {
    this.cargarBienes();
    this.cargarEncargados();
    this.cargarTipoBienes();
    this.cargarSuministros();
  }
  cargarBienes() {
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
      },
      err => console.log(err)
    );
  }
  cargarSuministros() {
    this.siministrosService.getSuministro().subscribe(
      res => {
        this.suministros = res;
        this.suministroAuxs = res;
      
      },
      err => console.log(err)
    );

  }
  cargarEncargados() {
    this.bienesService.getEncargado().subscribe(
      res => {
        this.encargados = res;
        this.encargadosAux = res;
      },
      err => console.log(err)
    );
  }
  cargarTipoBienes() {
    this.bienesService.getTipoBienes().subscribe(
      res => {
        this.tipobienes = res;
      },
      err => console.log(err)
    );
  }
  mostrar(estado:boolean){
    if(estado){
      (<HTMLDivElement>document.getElementById('visor2')).style.display='block';
      (<HTMLDivElement>document.getElementById('visor1')).style.display='none';
    }else{
      (<HTMLDivElement>document.getElementById('visor2')).style.display='none';
      (<HTMLDivElement>document.getElementById('visor1')).style.display='block';
      var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
      iframe.src='';
    }
    
  }
  onClickEnlace(id:number){
      console.log(id);
      var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
      if(id==1){
        iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteBienesPrestados&rpredirect=true&prpeo=pdf&prptit=';
        this.mostrar(true);
        
      }else if(id==8){
        iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteSuministros&rpredirect=true&prpeo=pdf&prptit=';
        this.mostrar(true);
      }
      this.repoSEleccionado=id;
      
  }

  onClickMeBien(idBien:String){
    var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
    if(this.repoSEleccionado==2){
      
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reportePrestamoDevolucionBienes&rpredirect=true&prpeo=pdf&prptit=&id='+idBien;
      
    }else if(this.repoSEleccionado==3){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteBienesHijos&rpredirect=true&prpeo=pdf&prptit=&id='+idBien;
      
    }else if(this.repoSEleccionado==4){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteCodigosBienes&rpredirect=true&prpeo=pdf&prptit=&id_bien='+idBien;
    }else if(this.repoSEleccionado==5){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteMantenimientos&rpredirect=true&prpeo=pdf&prptit=&id='+idBien;

    }
    this.mostrar(true);
  }
  onClickMeEncargado(cedula:String){
    var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
    if(this.repoSEleccionado==6){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteEncargadoBien&rpredirect=true&prpeo=pdf&prptit=&cedula='+cedula;
      
    }
    this.mostrar(true);
  }
  onClickMeTipoBien(nombre:String){
    var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
    if(this.repoSEleccionado==7){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=TipoBien&rpredirect=true&prpeo=pdf&prptit=&tipoBien='+nombre;
      
    }
    this.mostrar(true);

  }
  onClickMeSuministro(id:string){
    var iframe=<HTMLIFrameElement>document.getElementById('visorReportes');
    if(this.repoSEleccionado==9){
      iframe.src='http://educaciononline.uta.edu.ec:8080/deadvreng/visor.xhtml?prpnm=reporteSuministroMovimientos&rpredirect=true&prpeo=pdf&prptit=&id='+id;
      
    }
    this.mostrar(true);
  }

 


}


