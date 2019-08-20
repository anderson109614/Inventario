import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';

import { BienesService } from './servicios/bienes.service';
import { SuministrosComponent } from './components/suministros/suministros.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { MantenimientosComponent } from './components/mantenimientos/mantenimientos.component';
import { NuevoprestamoComponent } from './components/nuevoprestamo/nuevoprestamo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    routingComponents,
    SuministrosComponent,
    PrestamosComponent,
    MantenimientosComponent,
    NuevoprestamoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgQrScannerModule
  ],
  providers: [BienesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
