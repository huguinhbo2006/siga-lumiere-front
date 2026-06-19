import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { NivelesService } from '../../servicios/niveles.service';
import { ReportesService } from '../../servicios/reportes.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrl: './reporte-ventas.component.css'
})
export class ReporteVentasComponent {
  lista: any;
  headers = [
              'FOLIO INSC',
              'SEMANA',
              'PLANTEL DE INSCRIPCION',
              'FECHA DE INSCRIPCION',
              'MES',
              'LLENADO POR',
              'CATEGORIA',
              'MODALIDAD',
              'CURSO',
              'HORARIO',
              'PLANTEL DE IMPARTICION',
              'APELLIDOS',
              'NOMBRES',
              'CELULAR',
              'E-MAIL',
              'PADRE O TUTOR',
              'TELEFONO PADRE O TUTOR',
              'MEDIO',
              'VIA',
              'MEDIO DE CONTACTO',
              'ESTATUS',
              'COSTO DEL CURSO',
              'DESCUENTO APLICADO',
              'COSTO FINAL',
              'SALDO ACTUAL'
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
      this.listaNiveles = respuesta;
      this.cargando = false;
    },
    error => {
      this.generales.interpretarError(error);
    })
  }

  traerCalendarios() {
    this.cargando = true;
    this.calendarios.mostrar().subscribe(respuesta => {
      this.listaCalendarios = respuesta;
      this.cargando = false;
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  traer() {
    this.cargando = true;
    this.reportes.reporteVentas(this.busqueda).subscribe(respuesta => {
      this.datos = respuesta;
      this.excel();
      this.cargando = false;
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  excel() {
    exportCSVFile(this.headers, this.datos, 'reporte de Ventas');
  }
}
