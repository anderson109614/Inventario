import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';

@Component({
  selector: 'app-bienesnuevo',
  templateUrl: './bienesnuevo.component.html',
  styleUrls: ['./bienesnuevo.component.css']
})
export class BienesnuevoComponent implements OnInit {

  tipobienes: any = [];
  monedas: any = [];
  actas: any = [];

  constructor(private bienesService:BienesService) { }

  ngOnInit() {
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
  }

}
