import { Injectable } from '@angular/core';
import {con} from '../models/coneccion';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  constructor(private http:HttpClient) { }


  ip = con.ipser;
  getLaboratorios(){
    return this.http.get(this.ip + 'Laboratorios/Laboratorios.php')
  }
  getHorarioLab(id:string){
    return this.http.get(this.ip + 'Laboratorios/Laboratorios.php?id='+id)
  }
}
