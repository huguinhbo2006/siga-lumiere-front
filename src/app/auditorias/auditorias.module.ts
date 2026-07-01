import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosAuditoriasComponent } from './ingresos-auditorias/ingresos-auditorias.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalFinancierosComponent } from './ingresos-auditorias/modales/modal-financieros/modal-financieros.component';
import { ModalObservacionesIngresoComponent } from './ingresos-auditorias/modales/modal-observaciones-ingreso/modal-observaciones-ingreso.component';
import { BalanceCuentasComponent } from './balance-cuentas/balance-cuentas.component';
import { AuditarComponent } from './auditar/auditar.component';
import { ModalTraspasoComponent } from './balance-cuentas/modales/modal-traspaso/modal-traspaso.component';



@NgModule({
  declarations: [
    IngresosAuditoriasComponent,
    ModalFinancierosComponent,
    ModalObservacionesIngresoComponent,
    BalanceCuentasComponent,
    AuditarComponent,
    ModalTraspasoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class AuditoriasModule { }
