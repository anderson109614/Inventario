import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {con} from '../models/coneccion';
import {DetalleLab} from '../models/DetalleLab'
@Injectable({
  providedIn: 'root'
})
export class HorariosService {


  constructor(private http:HttpClient) { }

  ip = con.ipser;

  getDias(){
    return this.http.get(this.ip + 'Laboratorios/Dias.php')
  }
  getHoras(){
    return this.http.get(this.ip + 'Laboratorios/Horarios.php')
  }
  guardarCabecera(det:DetalleLab){
    return this.http.post<DetalleLab>(this.ip + 'Laboratorios/Prestamos.php',det)
  }
  guardarDetalles(det:DetalleLab){
    return this.http.post<DetalleLab>(this.ip + 'Laboratorios/Horarios.php',det)
  }
  getTodosPRestamos(id:string){
    return this.http.get(this.ip + 'Laboratorios/Horarios.php?id='+id)
  }

}
