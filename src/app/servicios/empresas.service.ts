import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/Empresa';
import {con} from '../models/coneccion';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http:HttpClient) { }

  ip = con.ipser;

  getEmpresas(){
    return this.http.get(this.ip + 'Mantenimientos/Empresas.php')
  }

  guardarNuevaEmpresa(empresa: Empresa)
  {
    return this.http.post<Empresa>(this.ip+'Mantenimientos/Empresas.php', empresa);
  }

}
