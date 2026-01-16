import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesComponent } from './secciones/secciones.component';
import { ModalSeccionComponent } from './secciones/modales/modal-seccion/modal-seccion.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { TemasComponent } from './temas/temas.component';
import { ModalTemaComponent } from './temas/modales/modal-tema/modal-tema.component';
import { SubtemasComponent } from './subtemas/subtemas.component';
import { ModalSubtemaComponent } from './subtemas/modales/modal-subtema/modal-subtema.component';
import { QuizesComponent } from './quizes/quizes.component';
import { ModalQuizComponent } from './quizes/modales/modal-quiz/modal-quiz.component';
import { ModalPreguntasQuizComponent } from './quizes/modales/modal-preguntas-quiz/modal-preguntas-quiz.component';
import { LecturasComponent } from './lecturas/lecturas.component';
import { ModalLecturaComponent } from './lecturas/modales/modal-lectura/modal-lectura.component';
import { AplicacionProfesoresComponent } from './aplicacion-profesores/aplicacion-profesores.component';
import { ModalProfesorAplicacionComponent } from './aplicacion-profesores/modales/modal-profesor-aplicacion/modal-profesor-aplicacion.component';
import { AplicacionHomeComponent } from './aplicacion-home/aplicacion-home.component';
import { AplicacionGuiaAlumnoComponent } from './aplicacion-guia-alumno/aplicacion-guia-alumno.component';
import { ModalGuiaAlumnoComponent } from './aplicacion-guia-alumno/modales/modal-guia-alumno/modal-guia-alumno.component';
import { AplicacionCursosComponent } from './aplicacion-cursos/aplicacion-cursos.component';



@NgModule({
  declarations: [
    SeccionesComponent,
    ModalSeccionComponent,
    TemasComponent,
    ModalTemaComponent,
    SubtemasComponent,
    ModalSubtemaComponent,
    QuizesComponent,
    ModalQuizComponent,
    ModalPreguntasQuizComponent,
    LecturasComponent,
    ModalLecturaComponent,
    AplicacionProfesoresComponent,
    ModalProfesorAplicacionComponent,
    AplicacionHomeComponent,
    AplicacionGuiaAlumnoComponent,
    ModalGuiaAlumnoComponent,
    AplicacionCursosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class AplicacionModule { }
