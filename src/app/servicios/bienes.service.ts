import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('http://10.7.2.176/servicios/Bienes.php')
  }

}
