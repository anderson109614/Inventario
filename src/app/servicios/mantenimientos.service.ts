import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mantenimiento } from '../models/Mantenimiento';
import {con} from '../models/coneccion';
@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private http:HttpClient) { }

  ip = con.ipser;

  getMantenimientoId(id:string){
    return this.http.get(this.ip + 'Mantenimientos/Mantenimientos.php?id='+id)
  }


  guardarNuevoMantenimiento(mantenimiento: Mantenimiento)
  {
    return this.http.post<Mantenimiento>(this.ip+'Mantenimientos/Mantenimientos.php', mantenimiento);
  }

  getTipoMantenimiento(){
    return this.http.get(this.ip+'Mantenimientos/TipoMantenimiento.php');
  }
}
