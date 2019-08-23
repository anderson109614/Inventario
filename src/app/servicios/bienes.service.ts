import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bien } from '../models/Bien';
import { Persona } from '../models/Persona';
import { Acta } from '../models/Acta';
import { Bodega } from '../models/Bodega';
import {con} from '../models/coneccion';
@Injectable({
  providedIn: 'root'
})
export class BienesService {

  constructor(private http:HttpClient) { }

  ip = con.ipser;
  getData(){
    return this.http.get(this.ip + 'Bienes/Bienes.php')
  }

  getBienId(id:number){
    return this.http.get(this.ip + 'Bienes/Bienes.php?id='+id)
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

  getTecnico(){
    return this.http.get(this.ip + 'Mantenimientos/Tecnicos.php')
  }


  guardarBiene(bien: Bien){
    return this.http.post<Bien>(this.ip+'Bienes/Bienes.php', bien)   
  }

  actualizarBien(bien: Bien)
  {
    return this.http.put<Bien>(this.ip+'Bienes/Bienes.php', bien) 
  }

  guardarNuevoEncargado(encargado: Persona)
  {
    return this.http.post<Persona>(this.ip+'Bienes/Encargados.php', encargado);
  }

  guardarNuevaActa(acta: Acta)
  {
    return this.http.post<Acta>(this.ip+'Bienes/Actas.php',acta);
  }

  guardarNuevaBodega(bodega:Bodega)
  {
    return this.http.post<Bodega>(this.ip+'Bienes/Bodegas.php', bodega);
  }

  eliminarBien(id:number){
    return this.http.delete(this.ip+'Bienes/Bienes.php?id='+id);
  }

}
