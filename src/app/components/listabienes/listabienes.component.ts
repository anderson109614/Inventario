import { Component, OnInit } from '@angular/core';
import {BienesService} from '../../servicios/bienes.service';


@Component({
  selector: 'app-listabienes',
  templateUrl: './listabienes.component.html',
  styleUrls: ['./listabienes.component.css']
})

export class ListabienesComponent implements OnInit {

  bienes: any = [];

  constructor(private bienesService:BienesService) { }

  ngOnInit() {
    this.bienesService.getData().subscribe(
      res => {
        this.bienes = res;
      },
      err => console.log(err)
    );
  }


}
