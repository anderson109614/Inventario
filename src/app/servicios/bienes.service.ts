import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('http://10.7.3.78/servicios/Bienes.php')
  }

}
