import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModulosComponent } from './modulos/modulos.component';
import { ModalOpcionComponent } from './modulos/modales/modal-opcion/modal-opcion.component';
import { ModalModuloComponent } from './modulos/modales/modal-modulo/modal-modulo.component';
import { PaginasComponent } from './paginas/paginas.component';
import { ModalPaginaComponent } from './paginas/modales/modal-pagina/modal-pagina.component';
import { TestingComponent } from './testing/testing.component';



@NgModule({
  declarations: [
    ModulosComponent,
    ModalOpcionComponent,
    ModalModuloComponent,
    PaginasComponent,
    ModalPaginaComponent,
    TestingComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class DesarrolloModule { }
