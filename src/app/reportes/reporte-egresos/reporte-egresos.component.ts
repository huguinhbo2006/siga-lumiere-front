import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { ReportesService } from '../../servicios/reportes.service';
import { NivelesService } from '../../servicios/niveles.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-egresos',
  templateUrl: './reporte-egresos.component.html',
  styleUrl: './reporte-egresos.component.css'
})
export class ReporteEgresosComponent {
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
  cargando = false;
  constructor(private generales:GeneralesService,
              private calendarios: CalendariosService,
              private niveles: NivelesService,
              private reportes: ReportesService) { }

  ngOnInit(): void {
    this.traerCalendarios();
    this.traerNiveles();
  }

  traerNiveles() {
    this.cargando = true;
    this.niveles.mostrar().subscribe(respuesta => {
      this.cargando = false;
      this.listaNiveles = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    })
  }

  traerCalendarios() {
    this.cargando = true;
    this.calendarios.mostrar().subscribe(respuesta => {
      this.cargando = false;
      this.listaCalendarios = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traer() {
    this.cargando = true;
    this.reportes.egresosGenerales(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.datos = respuesta;
      this.excel();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  excel() {
    exportCSVFile(this.headers, this.datos, 'Egresos Generales');
  }
}
