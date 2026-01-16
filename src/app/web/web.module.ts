import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { WebConfiguracionComponent } from './web-configuracion/web-configuracion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalConfiguracionComponent } from './web-configuracion/modales/modal-configuracion/modal-configuracion.component';
import { ModalConfiguracionBannerComponent } from './web-configuracion/modales/modal-configuracion-banner/modal-configuracion-banner.component';
import { ModalConfiguracionTituloComponent } from './web-configuracion/modales/modal-configuracion-titulo/modal-configuracion-titulo.component';
import { ModalConfiguracionCursosComponent } from './web-configuracion/modales/modal-configuracion-cursos/modal-configuracion-cursos.component';
import { ModalConfiguracionVideoComponent } from './web-configuracion/modales/modal-configuracion-video/modal-configuracion-video.component';



@NgModule({
  declarations: [
    WebConfiguracionComponent,
    ModalConfiguracionComponent,
    ModalConfiguracionBannerComponent,
    ModalConfiguracionTituloComponent,
    ModalConfiguracionCursosComponent,
    ModalConfiguracionVideoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    DragDropModule
  ]
})
export class WebModule { }
