import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {con} from '../models/coneccion';
import {Dependencia} from '../models/Dependencia';
import {Informacion} from '../models/Informacion'
import {Infor} from '../models/Inf';
@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  ip = con.ipser;
  constructor(private http:HttpClient) { }
  getInformacion(){
    return this.http.get(this.ip + 'Informacion/Informacion.php')
  }
  GuardarInformacion(dep:Informacion){
    return this.http.post<Informacion>(this.ip + 'Informacion/Informacion.php',dep)
  }
  GuardarInformacionLaboratorios(i:Infor){
    return this.http.post(this.ip + 'LabInformacion/Informacion.php',i)
  }

}
