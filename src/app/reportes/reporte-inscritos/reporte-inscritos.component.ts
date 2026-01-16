import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { ReportesService } from '../../servicios/reportes.service';
import { NivelesService } from '../../servicios/niveles.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-inscritos',
  templateUrl: './reporte-inscritos.component.html',
  styleUrl: './reporte-inscritos.component.css'
})
export class ReporteInscritosComponent {
  lista: any;
  headers = [
    'No.',
    'FOLIO INSC',
    'SEMANA',
    'PLANTEL DE INSCRIPCION',
    'FECHA DE INSCRIPCION',
    'MES',
    'LLENADO POR',
    'CATEGORIA',
    'CALENDARIO',
    'NIVEL',
    'MODALIDAD',
    'CURSO',
    'FECHA DE INICIO',
    'FECHA DE TERMINO',
    'HORARIO',
    'PLANTEL DE IMPARTICION',
    'APELLIDOS',
    'NOMBRES',
    'SEXO',
    'FECHA DE NACIMIENTO',
    'EDAD',
    'CALLE',
    'NUMERO',
    'COLONIA',
    'CP',
    'CIUDAD',
    'ESTADO',
    'OTRAS',
    'TELEFONO FIJO',
    'CELULAR',
    'E-MAIL',
    'PADRE O TUTOR',
    'TELEFONO PADRE O TUTOR',
    'MAIL PADRE O TUTOR',
    'TIPO DE ESCUELA',
    'ESCUELA DE PROCEDENCIA',
    'OTRA 2',
    'CIUDAD DE ESCUELA',
    'OTRAS 3',
    'PROMEDIO',
    'ESCUELA DE ASPIRACION',
    'OTRAS',
    'CARRERA (SOLO LICENCIATURA)',
    'OTRA 4',
    'PUNTAJE CARRERA',
    'PUNTAJE NECESARIO',
    'VECES PRESENTADAS',
    'TOMO CURSO',
    '¿DONDE?',
    'OTRO',
    'MEDIO',
    'VIA',
    'OTRO 2',
    'CAMPAÑA',
    'TIEMPO DE INSCRIPCION/MEDIO CONTACTO',
    'RAZON 1',
    'NUMERO REGISTROS',
    'CONTRASEÑA',
    'ASESORIAS',
    'ADMITIDO',
    'PUNTAJE PAA',
    'PROFESOR MATE',
    'PROFESOR ESPAÑOL',
    'CONTACTO DEL CURSO',
    'DESCUENTO APLICADO %',
    'DESCUENTO ADICIONAL',
    'TIPO DE DESCUENTO',
    'COSTO FINAL CON DCTO',
    'SALDO ACTUAL',
    'NUMERO DE ABONOS',
    'ESTATUS',
    'FECHA LIMITE DE PAGO',
    'FECHA CONVENIO',
  ];
  listaNiveles: any;
  listaCalendarios: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    sucursal: localStorage.getItem('sucursal')
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
    this.reportes.reporteInscritos(this.busqueda).subscribe(respuesta => {
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
    exportCSVFile(this.headers, this.datos, 'Inscritos de Plantel ' + localStorage.getItem('nombreSucursal'));
  }
}
