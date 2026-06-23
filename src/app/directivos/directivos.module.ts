import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { AltaCursosComponent } from './alta-cursos/alta-cursos.component';
import { ModalAltaCursosComponent } from './alta-cursos/modales/modal-alta-cursos/modal-alta-cursos.component';
import { ModalHorariosComponent } from './alta-cursos/modales/modal-horarios/modal-horarios.component';
import { IngresosDirectivosComponent } from './ingresos-directivos/ingresos-directivos.component';
import { ModalIngresoDirectivosComponent } from './ingresos-directivos/modales/modal-ingreso-directivos/modal-ingreso-directivos.component';
import { ModalVoucherDirectivosComponent } from './ingresos-directivos/modales/modal-voucher-directivos/modal-voucher-directivos.component';
import { EgresosDirectivosComponent } from './egresos-directivos/egresos-directivos.component';
import { ModalEgresoDirectivosComponent } from './egresos-directivos/modales/modal-egreso-directivos/modal-egreso-directivos.component';
import { ModalVoucherEgresosDirectivosComponent } from './egresos-directivos/modales/modal-voucher-egresos-directivos/modal-voucher-egresos-directivos.component';
import { ModalModificarFechaEgresoDirectivosComponent } from './egresos-directivos/modales/modal-modificar-fecha-egreso-directivos/modal-modificar-fecha-egreso-directivos.component';
import { BalanceSucursalComponent } from './balance-sucursal/balance-sucursal.component';
import { MetasIngresosComponent } from './metas-ingresos/metas-ingresos.component';
import { PermisosComponent } from './permisos/permisos.component';
import { AutorizacionNominasComponent } from './autorizacion-nominas/autorizacion-nominas.component';
import { RecepcionValesComponent } from './recepcion-vales/recepcion-vales.component';
import { SolicitudesModificacionIngresosComponent } from './solicitudes-modificacion-ingresos/solicitudes-modificacion-ingresos.component';
import { SolicitudesModificacionEgresosComponent } from './solicitudes-modificacion-egresos/solicitudes-modificacion-egresos.component';
import { SolicitudesNominasComponent } from './solicitudes-nominas/solicitudes-nominas.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { ModalTransferenciaComponent } from './transferencias/modales/modal-transferencia/modal-transferencia.component';
import { CreditosComponent } from './creditos/creditos.component';
import { ModalCreditoComponent } from './creditos/modales/modal-credito/modal-credito.component';



@NgModule({
  declarations: [
    AltaCursosComponent,
    ModalAltaCursosComponent,
    ModalHorariosComponent,
    IngresosDirectivosComponent,
    ModalIngresoDirectivosComponent,
    ModalVoucherDirectivosComponent,
    EgresosDirectivosComponent,
    ModalEgresoDirectivosComponent,
    ModalVoucherEgresosDirectivosComponent,
    ModalModificarFechaEgresoDirectivosComponent,
    BalanceSucursalComponent,
    MetasIngresosComponent,
    PermisosComponent,
    AutorizacionNominasComponent,
    RecepcionValesComponent,
    SolicitudesModificacionIngresosComponent,
    SolicitudesModificacionEgresosComponent,
    SolicitudesNominasComponent,
    TransferenciasComponent,
    ModalTransferenciaComponent,
    CreditosComponent,
    ModalCreditoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ],
  exports: [
    ModalEgresoDirectivosComponent,
    ModalIngresoDirectivosComponent,
    ModalVoucherDirectivosComponent,
    ModalVoucherEgresosDirectivosComponent,
    ModalVoucherDirectivosComponent
  ]
})
export class DirectivosModule { }
