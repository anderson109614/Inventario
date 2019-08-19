import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListabienesComponent } from './components/listabienes/listabienes.component';
import { BienesactualizarComponent } from './components/bienesactualizar/bienesactualizar.component';
import { BienesnuevoComponent } from './components/bienesnuevo/bienesnuevo.component';
import { SuministrosComponent} from './components/suministros/suministros.component';
import {PrestamosComponent} from './components/prestamos/prestamos.component';
import { MantenimientosComponent} from './components/mantenimientos/mantenimientos.component';
const routes: Routes = [
  {path:'listabienes', component: ListabienesComponent},
  {path:'bienesactualizar/:id', component: BienesactualizarComponent},
  {path:'bienesnuevo', component: BienesnuevoComponent},
  {path:'suministros', component: SuministrosComponent},
  {path:'prestamos', component: PrestamosComponent},
  {path:'mantenimientos', component: MantenimientosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListabienesComponent, BienesactualizarComponent, BienesnuevoComponent]