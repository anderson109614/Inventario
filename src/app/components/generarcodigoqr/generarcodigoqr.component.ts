import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeNode } from 'source-list-map';

@Component({
  selector: 'app-generarcodigoqr',
  templateUrl: './generarcodigoqr.component.html',
  styleUrls: ['./generarcodigoqr.component.css']
})
export class GenerarcodigoqrComponent implements OnInit {

  elementType : 'url' | 'canvas' | 'img' = 'url';
  codigoBien : string = this.rutaActiva.snapshot.params.codigo;
  value : string = this.codigoBien;
  display = false;
  href : string;

  
  constructor(private rutaActiva: ActivatedRoute,) { }

  
  ngOnInit() {

  }

  
  downloadImage(){
    //console.log(document.getElementsByTagName('img')[0].src);
    this.href = document.getElementsByTagName('img')[0].src;
    
  }

}
