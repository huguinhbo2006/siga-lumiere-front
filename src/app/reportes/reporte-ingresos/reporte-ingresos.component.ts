import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { ReportesService } from '../../servicios/reportes.service';
import { NivelesService } from '../../servicios/niveles.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrl: './reporte-ingresos.component.css'
})
export class ReporteIngresosComponent {
  lista: any;
  headers = [
              'No.',
              'Folio',
              'Nivel',
              'Calendario',
              'Sucursal',
              'Mes',
              'Fecha',
              'Hora',
              'Rubro',
              'Concepto',
              'Pago',
              'Cuenta',
              'Monto'
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
    this,this.cargando = true;
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
    this.reportes.ingresosGenerales(this.busqueda).subscribe(respuesta => {
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
    exportCSVFile(this.headers, this.datos, 'Ingresos Generales');
  }
}
