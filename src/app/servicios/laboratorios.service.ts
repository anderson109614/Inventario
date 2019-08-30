import { Injectable } from '@angular/core';
import {con} from '../models/coneccion';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/Persona';
import { Laboratorio } from '../models/Laboratorio';
@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  constructor(private http:HttpClient) { }


  ip = con.ipser;
  getLaboratorios(){
    return this.http.get(this.ip + 'Laboratorios/Laboratorios.php')
  }

  getLaboratorioId(id:string){
    return this.http.get(this.ip + 'Laboratorios/Laboratorios.php?id='+id)
  }

  getHorarioLab(id:string){
    return this.http.get(this.ip + 'Laboratorios/Dias.php?id='+id)
  }

  getLaboratoristas(){
    return this.http.get(this.ip + 'Laboratorios/Laboratoristas.php')
  }

  getPrestamos(id:string, fecha:string){
    return this.http.get(this.ip + 'Laboratorios/Prestamos.php?id='+id+'&fecha='+fecha)
  }
  delPrestamos(idPre:string, idHor:string){
    return this.http.delete(this.ip + 'Laboratorios/Prestamos.php?idPrestamo='+idPre+'&idHorarios='+idHor)
  }

  guardarLaboratorista(laboratorista:Persona){
    return this.http.post<Persona>(this.ip + 'Laboratorios/Laboratoristas.php', laboratorista)
  }

  guardarLaboratorio(laboratorio:Laboratorio){
    return this.http.post<Laboratorio>(this.ip + 'Laboratorios/Laboratorios.php', laboratorio)
  }

  actualizarLaboratorio(laboratorio:Laboratorio){
    return this.http.put<Laboratorio>(this.ip + 'Laboratorios/Laboratorios.php', laboratorio)
  }
  
  eliminarLaboratorio(id:string){
    return this.http.delete(this.ip+'Laboratorios/Laboratorios.php?id='+id);
  }
  
}
