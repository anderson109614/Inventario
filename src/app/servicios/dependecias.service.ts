import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {con} from '../models/coneccion';

@Injectable({
  providedIn: 'root'
})
export class DependeciasService {

  ip = con.ipser;
  constructor(private http:HttpClient) { }
  getDependencias(){
    return this.http.get(this.ip + 'Dependencias/dependencias.php')
  }
  
}
