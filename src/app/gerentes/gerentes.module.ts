import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { AulasComponent } from './aulas/aulas.component';
import { ModalAulasComponent } from './aulas/modales/modal-aulas/modal-aulas.component';
import { BalanceGerentesComponent } from './balance-gerentes/balance-gerentes.component';
import { BloqueoHorariosComponent } from './bloqueo-horarios/bloqueo-horarios.component';
import { ControlHorariosComponent } from './control-horarios/control-horarios.component';
import { EgresosGerentesComponent } from './egresos-gerentes/egresos-gerentes.component';
import { DirectivosModule } from '../directivos/directivos.module';
import { EmpleadosGerentesComponent } from './empleados-gerentes/empleados-gerentes.component';
import { ModalDocumentosEmpleadoComponent } from './empleados-gerentes/modales/modal-documentos-empleado/modal-documentos-empleado.component';
import { RecursosHumanosModule } from '../recursos-humanos/recursos-humanos.module';
import { IngresosGerentesComponent } from './ingresos-gerentes/ingresos-gerentes.component';
import { ReservacionAulasComponent } from './reservacion-aulas/reservacion-aulas.component';
import { ModalReservacionAulasComponent } from './reservacion-aulas/modales/modal-reservacion-aulas/modal-reservacion-aulas.component';
import { ValesGerencialesGerentesComponent } from './vales-gerenciales-gerentes/vales-gerenciales-gerentes.component';



@NgModule({
  declarations: [
    AulasComponent,
    ModalAulasComponent,
    BalanceGerentesComponent,
    BloqueoHorariosComponent,
    ControlHorariosComponent,
    EgresosGerentesComponent,
    EmpleadosGerentesComponent,
    ModalDocumentosEmpleadoComponent,
    IngresosGerentesComponent,
    ReservacionAulasComponent,
    ModalReservacionAulasComponent,
    ValesGerencialesGerentesComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    DirectivosModule,
    RecursosHumanosModule
  ]
})
export class GerentesModule { }
