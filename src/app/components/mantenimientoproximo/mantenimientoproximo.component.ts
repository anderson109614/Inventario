import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';

@Component({
  selector: 'app-mantenimientoproximo',
  templateUrl: './mantenimientoproximo.component.html',
  styleUrls: ['./mantenimientoproximo.component.css']
})
export class MantenimientoproximoComponent implements OnInit {

  mantenimientos : any = [];

  constructor( private mantenimientosService:MantenimientosService) { }

  ngOnInit() {
    this.cargarMantenimientosProximos();
  }

  cargarMantenimientosProximos(){
    this.mantenimientosService.getProximosMantenimientos().subscribe(
      res => {
        console.log(res);
        this.mantenimientos = res;
      },
      err => console.log(err)
    );
  }

}
