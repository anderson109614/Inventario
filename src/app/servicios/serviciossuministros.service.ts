import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Persona} from '../models/Persona';
@Injectable({
  providedIn: 'root'
})
export class ServiciossuministrosService {

  constructor(private http:HttpClient) {  }

  ip = 'http://10.7.3.197/servicios/';
  getSuministro(){
    return this.http.get(this.ip + 'Suministros/Suministros.php')
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
}
