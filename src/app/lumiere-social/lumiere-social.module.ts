import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificadorComponent } from './calificador/calificador.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { CalificarGrupoComponent } from './calificar-grupo/calificar-grupo.component';
import { ModalCalificarAlumnoComponent } from './calificar-grupo/modales/modal-calificar-alumno/modal-calificar-alumno.component';



@NgModule({
  declarations: [
    CalificadorComponent,
    CalificarGrupoComponent,
    ModalCalificarAlumnoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ],
  exports: [
    ModalCalificarAlumnoComponent
  ]
})
export class LumiereSocialModule { }
