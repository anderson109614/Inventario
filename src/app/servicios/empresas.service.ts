import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http:HttpClient) { }

  ip = 'http://10.7.1.178/servicios/';

  getEmpresas(){
    return this.http.get(this.ip + 'Mantenimientos/Empresas.php')
  }

  guardarNuevaEmpresa(empresa: Empresa)
  {
    return this.http.post<Empresa>(this.ip+'Mantenimientos/Empresas.php', empresa);
  }

}
