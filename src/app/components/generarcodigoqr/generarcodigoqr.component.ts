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
  download : string = this.codigoBien;

  
  constructor(private rutaActiva: ActivatedRoute) { }

  
  ngOnInit() {
  }

  
  downloadImage(){
    //console.log(document.getElementsByTagName('img')[0].src);
    this.href = document.getElementsByTagName('img')[0].src;
    
  }

  imprimir(){
    var objeto=document.getElementById('imprimible');  //obtenemos el objeto a imprimir
    //var objeto=document.getElementsByTagName('img')[0].src;
    var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva
    ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
    ventana.document.close();  //cerramos el documento
    ventana.print();  //imprimimos la ventana
    ventana.close();  //cerramos la ventana
    location.reload(true);
  }

}
