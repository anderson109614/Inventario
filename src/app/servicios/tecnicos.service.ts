import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnico } from '../models/Tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http:HttpClient) { }

  ip = 'http://10.7.1.207/servicios/';

  guardarNuevoTecnico(tecnico: Tecnico)
  {
    return this.http.post<Tecnico>(this.ip+'Mantenimientos/Tecnicos.php', tecnico);
  }
}
