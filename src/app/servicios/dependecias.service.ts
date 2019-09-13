import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {con} from '../models/coneccion';
import {Dependencia} from '../models/Dependencia';

@Injectable({
  providedIn: 'root'
})
export class DependeciasService {

  ip = con.ipser;
  constructor(private http:HttpClient) { }
  getDependencias(){
    return this.http.get(this.ip + 'Dependencias/dependencias.php')
  }
  GuardarDependencia(dep:Dependencia){
    return this.http.post<Dependencia>(this.ip + 'Dependencias/dependencias.php',dep)
  }
  
}
