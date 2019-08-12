import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListabienesComponent } from './components/listabienes/listabienes.component';

const routes: Routes = [
  {path:'listabienes', component: ListabienesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListabienesComponent]