import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnico } from '../models/Tecnico';
import {con} from '../models/coneccion';
@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http:HttpClient) { }

  ip = con.ipser;

  guardarNuevoTecnico(tecnico: Tecnico)
  {
    return this.http.post<Tecnico>(this.ip+'Mantenimientos/Tecnicos.php', tecnico);
  }
}
