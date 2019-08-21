import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mantenimiento } from '../models/Mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private http:HttpClient) { }

  ip = 'http://10.7.2.56/servicios/';

  getMantenimientoId(id:string){
    return this.http.get(this.ip + 'Mantenimientos/Mantenimientos.php?id='+id)
  }


  guardarNuevoMantenimiento(mantenimiento: Mantenimiento)
  {
    return this.http.post<Mantenimiento>(this.ip+'Mantenimientos/Mantenimientos.php', mantenimiento);
  }
}
