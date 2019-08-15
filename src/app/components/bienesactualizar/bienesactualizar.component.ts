import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';
import { Bien } from '../../models/Bien';
import { ActivatedRoute } from '@angular/router';

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

}
