import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ReporteEstadisticasMaestasComponent } from './reporte-estadisticas-maestas/reporte-estadisticas-maestas.component';
import { ReporteAlumnosComponent } from './reporte-alumnos/reporte-alumnos.component';
import { ReporteEgresosComponent } from './reporte-egresos/reporte-egresos.component';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import { ReporteInscritosComponent } from './reporte-inscritos/reporte-inscritos.component';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { ReporteIngresosBasicoComponent } from './reporte-ingresos-basico/reporte-ingresos-basico.component';
import { ReporteEgresosBasicoComponent } from './reporte-egresos-basico/reporte-egresos-basico.component';



@NgModule({
  declarations: [
    ReporteEstadisticasMaestasComponent,
    ReporteAlumnosComponent,
    ReporteEgresosComponent,
    ReporteIngresosComponent,
    ReporteInscritosComponent,
    ReporteVentasComponent,
    ReporteIngresosBasicoComponent,
    ReporteEgresosBasicoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class ReportesModule { }
