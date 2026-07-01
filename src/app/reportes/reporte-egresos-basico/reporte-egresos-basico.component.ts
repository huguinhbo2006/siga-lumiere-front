import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { ReportesService } from '../../servicios/reportes.service';
import { NivelesService } from '../../servicios/niveles.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-egresos-basico',
  templateUrl: './reporte-egresos-basico.component.html',
  styleUrl: './reporte-egresos-basico.component.css'
})
export class ReporteEgresosBasicoComponent {
  lista: any;
  headers = [
              'No.',
              'Folio',
              'Nivel',
              'Calendario',
              'Sucursal Caputura',
              'Sucursal Egreso',
              'Mes',
              'Fecha',
              'Hora',
              'Rubro',
              'Tipo',
              'Concepto',
              'Pago',
              'Cuenta',
              'Monto',
              'Estatus'
            ];
  listaNiveles: any;
  listaCalendarios: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0
  };
  datos: any;
  constructor(private generales:GeneralesService,
              private calendarios: CalendariosService,
              private reportes: ReportesService) { }

  ngOnInit(): void {
    this.traerCalendarios();
  }

  traerCalendarios() {
    this.calendarios.mostrar().subscribe(respuesta => {
      this.listaCalendarios = respuesta;
    });
  }

  traer() {
    this.reportes.egresosBasico(this.busqueda).subscribe(respuesta => {
      this.datos = respuesta;
      this.excel();
    });
  }

  excel() {
    exportCSVFile(this.headers, this.datos, 'Egresos Generales');
  }
}
