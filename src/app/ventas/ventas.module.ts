import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesVentasComponent } from './inscripciones-ventas/inscripciones-ventas.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { AdministradorModule } from '../administrador/administrador.module';
import { ComisionesEmpleadoComponent } from './comisiones-empleado/comisiones-empleado.component';
import { ComisionesGeneralesComponent } from './comisiones-generales/comisiones-generales.component';
import { ComisionesCursosComponent } from './comisiones-cursos/comisiones-cursos.component';
import { ModalComisionCursoComponent } from './comisiones-cursos/modales/modal-comision-curso/modal-comision-curso.component';
import { MetasIngresosVentasComponent } from './metas-ingresos-ventas/metas-ingresos-ventas.component';
import { ModalMetaIngresoVentasComponent } from './metas-ingresos-ventas/modales/modal-meta-ingreso-ventas/modal-meta-ingreso-ventas.component';
import { MetasCategoriasVentasComponent } from './metas-categorias-ventas/metas-categorias-ventas.component';
import { ModalMetaCatrgoriaVentasComponent } from './metas-categorias-ventas/modales/modal-meta-catrgoria-ventas/modal-meta-catrgoria-ventas.component';
import { MetasCursosVentasComponent } from './metas-cursos-ventas/metas-cursos-ventas.component';
import { ModalMetaCursoVentasComponent } from './metas-cursos-ventas/modales/modal-meta-curso-ventas/modal-meta-curso-ventas.component';
import { MetasMesVentasComponent } from './metas-mes-ventas/metas-mes-ventas.component';
import { ModalMetaMesVentasComponent } from './metas-mes-ventas/modales/modal-meta-mes-ventas/modal-meta-mes-ventas.component';
import { CRMComponent } from './crm/crm.component';
import { ModalProspectoComponent } from './crm/modales/modal-prospecto/modal-prospecto.component';
import { MetasEconomicasComponent } from './metas-economicas/metas-economicas.component';
import { ModalMetaEconomicaComponent } from './metas-economicas/modales/modal-meta-economica/modal-meta-economica.component';
import { MetasEconomicasVendedorComponent } from './metas-economicas-vendedor/metas-economicas-vendedor.component';
import { MetaEconomicaComponent } from './meta-economica/meta-economica.component';



@NgModule({
  declarations: [
    InscripcionesVentasComponent,
    ComisionesEmpleadoComponent,
    ComisionesGeneralesComponent,
    ComisionesCursosComponent,
    ModalComisionCursoComponent,
    MetasIngresosVentasComponent,
    ModalMetaIngresoVentasComponent,
    MetasCategoriasVentasComponent,
    ModalMetaCatrgoriaVentasComponent,
    MetasCursosVentasComponent,
    ModalMetaCursoVentasComponent,
    MetasMesVentasComponent,
    ModalMetaMesVentasComponent,
    CRMComponent,
    ModalProspectoComponent,
    MetasEconomicasComponent,
    ModalMetaEconomicaComponent,
    MetasEconomicasVendedorComponent,
    MetaEconomicaComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    AdministradorModule
  ]
})
export class VentasModule { }
