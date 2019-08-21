import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Prestamo} from '../models/Prestamo';
@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  ip = 'http://10.7.2.56/servicios/';
  constructor(private http:HttpClient) { }

  getPrestamos(){
    return this.http.get(this.ip + 'Prestamos/Prestamos.php')
  }
  getPrestamosEstado(Estado:string){
    return this.http.get(this.ip + 'Prestamos/Prestamos.php?Estado='+Estado)
  }
  getPrestamosId(Id:string){
    return this.http.get(this.ip + "Prestamos/Prestamos.php?Id='"+this.ip+"'")
  }
  devolverPrestamo(prestamo:Prestamo){
    return this.http.put<Prestamo>(this.ip + 'Prestamos/Prestamos.php',prestamo)

  }
  guardarPrestamo(prestamo:Prestamo){
    return this.http.post<Prestamo>(this.ip + 'Prestamos/Prestamos.php',prestamo)

  }
  getBienes(){
    return this.http.get(this.ip + 'Prestamos/Bienes.php')
  }
  getPrestamosCodigo(Id:string){
    return this.http.get<Prestamo>(this.ip + 'Prestamos/Prestamos.php?Codigo='+Id)
  }


}
