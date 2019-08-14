import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
