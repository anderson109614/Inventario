import { Component, Inject , Injectable} from '@angular/core';
import{Login} from './models/Login';
import {LoginService} from './servicios/login.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienteInventario';
  log:boolean=false;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private loginService: LoginService,  public router: Router){}
  ngOnInit() {
    let lg:Login=this.storage.get('Usuario');
    if(lg!=null){
      this.MostrarLogin(false);
    }else{
      this.MostrarLogin(true);
    }
    



  }
  MostrarLogin(estado:boolean){
    console.log('entro');
    if(estado){
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display='none';
    (<HTMLDivElement>document.getElementById('DivLogin')).style.display='block';
    }else{
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display='block';
      (<HTMLDivElement>document.getElementById('DivLogin')).style.display='none';
      
    }
    
  }
  onClickLogin(){
    var usr= (<HTMLInputElement>document.getElementById("txt-login-username")).value;
    var cont= (<HTMLInputElement>document.getElementById("txt-login-password")).value;
    let log:Login={
      id:0,
      cedula:'',
      nombre:'',
      apellido:'',
      usuario:usr,
      contrasena:cont


    }
    this.loginService.GenerarLogin(log).subscribe(
      res => {
        try {
          if(res[0].id!=0){
            this.MostrarLogin(false);
            this.storage.set('Usuario',res[0]);
            this.router.navigateByUrl('/listabienes');
          } 
        }
        catch(e) {
          (<HTMLLabelElement>document.getElementById('lbl_error')).style.display='block';
          (<HTMLLabelElement>document.getElementById('lbl_error')).textContent="Error.... Ingrese un usuario y contraseña validos!!";

        }


        
      },
      err => console.log(err)
    );
  }
}
