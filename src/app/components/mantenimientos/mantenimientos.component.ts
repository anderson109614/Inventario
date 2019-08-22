import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';
import { BienesService } from 'src/app/servicios/bienes.service';
import { Router } from '@angular/router';
import { con } from 'src/app/models/coneccion';

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
    this.cargarMantenimientos();
  }

  cargarMantenimientos(){
    this.mantenimientosService.getProximosMantenimientos().subscribe(
      res => {
        console.log(res);
        this.notificarMantenimientos(res);
      },
      err => console.log(err)
    );
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
      this.router.navigate(['/mantenimientonuevo/',this.idBienSeleccionado]);
    }else{
      alert('Seleccionar Bien');
    }
  }

  //Busqueda
  checkBienes($event: KeyboardEvent){
    this.bienes=this.bienesAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.bienes.filter(bien => bien.codigo.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.identificador.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.serie_identificacion.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.modelo.toUpperCase().search(value.toUpperCase())==0 
                                           || bien.marca.toUpperCase().search(value.toUpperCase())==0);

                                     
    this.bienes=result;
  }

  checkMantenimientos($event: KeyboardEvent){
    this.detalles=this.detallesAux;
    let value = (<HTMLInputElement>event.target).value;
    const result = this.detalles.filter(detalle => detalle.mantenimiento.toUpperCase().search(value.toUpperCase())==0 
                                                || detalle.descripcion.toUpperCase().search(value.toUpperCase())==0 
                                                || detalle.fecha.toUpperCase().search(value.toUpperCase())==0 
                                                || detalle.nombres.toUpperCase().search(value.toUpperCase())==0 
                                                || detalle.apellidos.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.estado.toUpperCase().search(value.toUpperCase())==0
                                                || detalle.observacion.toUpperCase().search(value.toUpperCase())==0);

    this.detalles=result;
  }
  //

  //Notificacion
  notifycacion(msj:string) {
    
    if (!("Notification" in window)) {
      alert("Tu explorados no soporta las notificaciones de escritorio");
    }else if (Notification.permission === "granted") {
      
      var notification = new Notification(msj);
      
        notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://localhost:4200/mantenimientoproximo', '_self');
      }
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
       
        if (permission === "granted") {
          var notification = new Notification(msj);
        }
      });
    }
  }

  notificarMantenimientos(res:any){
   var a=  0;
   res.forEach(function() {
      a++;
  }); 
  console.log(a);
    if(a>0){
      if(a==1){
        this.notifycacion('Tiene ' + a + ' bien próximo ha realizar mantenimiento');
      }else{
        this.notifycacion('Tiene ' + a + ' bienes próximos ha realizar mantenimiento');
      }
    }
   
  }
  //
}
