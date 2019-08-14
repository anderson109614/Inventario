import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bien } from '../models/Bien';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  constructor(private http:HttpClient) { }

  ip = 'http://10.7.3.91/servicios/';
  getData(){
    return this.http.get(this.ip + 'Bienes/Bienes.php')
  }

  getTipoBienes(){
    return this.http.get(this.ip+'Bienes/TipoBienes.php')
  }

  getTipoMoneda(){
    return this.http.get(this.ip+'Bienes/Monedas.php')
  }

  getActa(){
    return this.http.get(this.ip+'Bienes/Actas.php')
  }

  getEncargado(){
    return this.http.get(this.ip+'Bienes/Encargados.php')
  }

  getBodega(){
    return this.http.get(this.ip+'Bienes/Bodegas.php')
  }


  guardarBiene(bien: Bien){
    return this.http.post(this.ip+'Bienes/Bienes.php', bien)
  }

}
