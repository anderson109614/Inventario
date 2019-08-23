import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListabienesComponent } from './components/listabienes/listabienes.component';
import { BienesactualizarComponent } from './components/bienesactualizar/bienesactualizar.component';
import { BienesnuevoComponent } from './components/bienesnuevo/bienesnuevo.component';
import { SuministrosComponent} from './components/suministros/suministros.component';
import {PrestamosComponent} from './components/prestamos/prestamos.component';
import { MantenimientosComponent} from './components/mantenimientos/mantenimientos.component';
import { MantenimientonuevoComponent } from './components/mantenimientonuevo/mantenimientonuevo.component';
import {NuevoprestamoComponent} from './components/nuevoprestamo/nuevoprestamo.component'
import { GenerarcodigoqrComponent } from './components/generarcodigoqr/generarcodigoqr.component';
import {LaboratoriosComponent} from './components/laboratorios/laboratorios.component';
import {HorariosComponent} from './components/horarios/horarios.component';
import {MantenimientoproximoComponent} from './components/mantenimientoproximo/mantenimientoproximo.component';
import { LaboratoriosnuevoComponent } from './components/laboratoriosnuevo/laboratoriosnuevo.component';
const routes: Routes = [
  {path:'listabienes', component: ListabienesComponent},
  {path:'bienesactualizar/:id', component: BienesactualizarComponent},
  {path:'bienesnuevo', component: BienesnuevoComponent},
  {path:'suministros', component: SuministrosComponent},
  {path:'prestamos', component: PrestamosComponent},
  {path:'mantenimientos', component: MantenimientosComponent},
  {path:'mantenimientonuevo/:id', component: MantenimientonuevoComponent},
  {path:'prestamos/nuevoprestamo', component: NuevoprestamoComponent},
  {path:'generarcodigoqr/:codigo', component: GenerarcodigoqrComponent},
  {path:'laboratorios', component: LaboratoriosComponent},
  {path:'horarios/:idLab', component: HorariosComponent},
  {path:'mantenimientoproximo', component: MantenimientoproximoComponent},
  {path:'laboratoriosnuevo', component: LaboratoriosnuevoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListabienesComponent, BienesactualizarComponent, BienesnuevoComponent, 
  MantenimientonuevoComponent, GenerarcodigoqrComponent,MantenimientoproximoComponent, LaboratoriosnuevoComponent]