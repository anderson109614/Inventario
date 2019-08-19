import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Persona} from '../models/Persona';
import {Suministro} from '../models/Suministro';
import {Unidad} from '../models/Unidad';
import {DetalleSuministro} from '../models/DetalleSuministro';
@Injectable({
  providedIn: 'root'
})
export class ServiciossuministrosService {

  constructor(private http:HttpClient) {  }

  ip = 'http://10.7.3.74/servicios/';
  getSuministro(){
    return this.http.get(this.ip + 'Suministros/Suministros.php')
  }
  getUnidades(){
    return this.http.get(this.ip + 'Suministros/Unidades.php')
  }

  //Suministros/DetalleMovimiento.php
  getDetalles(){
    return this.http.get(this.ip + 'Suministros/DetalleMovimiento.php')
  }
  getDetallesId(id:string){
    return this.http.get(this.ip + 'Suministros/DetalleMovimiento.php?id='+id)
  }

  getPersonas(){
       return this.http.get(this.ip + 'Suministros/Personas.php')
  }

  guardarPersona(per: Persona){
    return this.http.post<Persona>(this.ip+'Suministros/Personas.php', per)   
  }
  guardarSuministro(sun: Suministro){
    return this.http.post<Suministro>(this.ip+'Suministros/Suministros.php', sun)   
  }
  guardarUnidad(uni: Unidad){
    return this.http.post<Unidad>(this.ip+'Suministros/Unidades.php', uni)   
  }
  guardarDetalleSuministro(det:DetalleSuministro){
    return this.http.post<DetalleSuministro>(this.ip+'Suministros/DetalleMovimiento.php', det)   
  }
  actualizarSuministro(sun: Suministro){
    return this.http.put<Suministro>(this.ip+'Suministros/Suministros.php', sun)   
  }

}
