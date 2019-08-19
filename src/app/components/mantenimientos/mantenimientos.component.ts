import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';
import { BienesService } from 'src/app/servicios/bienes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {


  bienes: any = [];
  bienesAux: any = [];
  detalles: any = [];
  detallesAux: any = [];

  constructor(private bienesService:BienesService, private mantenimientosService:MantenimientosService,  public router: Router) { }
  idBienSeleccionado: string = '-1';
  existenciaAnterior:string='';

  ngOnInit() {
    this.cargarBienes();
  }

  cargarBienes()
  {
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
        this.bienesAux = res;
      },
      err => console.log(err)
    );
  }

  onClickMantenimiento(id: string) {
    this.idBienSeleccionado=id;
    //this.existenciaAnterior=existencia;

    this.mantenimientosService.getMantenimientoId(id).subscribe(
      res => {
        //console.log(res);
        this.detalles = res;
        this.detallesAux=res;
        
      },
      err => console.log(err)
    );
    this.idBienSeleccionado = id;
  }

  //
  verificarSeleccion(){
    if(this.idBienSeleccionado!='-1'){
      (<HTMLButtonElement>document.getElementById("btn_NuevoMantenimiento")).disabled=false;
      this.router.navigate(['/mantenimientonuevo/',this.idBienSeleccionado]);
    }else{
      alert('Seleccionar Bien');
    }
  }

}
