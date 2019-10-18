import { Component, OnInit,Inject , Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import{Login} from '../../models/Login';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
   

  }
  onClickSalir(){
    /*
    let log:Login=  this.storage.get('Usuario');
   alert(log);
   */
  this.storage.set('Usuario',null);
  
  }
}
