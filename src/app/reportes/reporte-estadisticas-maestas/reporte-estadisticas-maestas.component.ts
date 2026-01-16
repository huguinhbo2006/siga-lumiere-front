import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { NivelesService } from '../../servicios/niveles.service';
import { EstadisticasMaestrasService } from '../../servicios/estadisticas-maestras.service';
declare function exportCSVFile(headers: any, items: any, filename: string): void;

@Component({
  selector: 'app-reporte-estadisticas-maestas',
  templateUrl: './reporte-estadisticas-maestas.component.html',
  styleUrl: './reporte-estadisticas-maestas.component.css'
})
export class ReporteEstadisticasMaestasComponent {
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
    idNivel: 0
  };
  datos: any;
  respuesta: any;
  final: any;
  cargando = false;
  porcentaje = 0;
  constructor(private generales:GeneralesService,
              private calendarios: CalendariosService,
              private niveles: NivelesService,
              private reportes: EstadisticasMaestrasService) { }

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
      this.cargando = false;
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

  traerID() {
    this.cargando = true;
    this.reportes.id(this.busqueda).subscribe(respuesta => {
      this.respuesta = respuesta;
      this.porcentaje = 17;
      this.traerDatos();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerDatos() {
    this.cargando = true;
    this.reportes.datos(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.porcentaje = 34;
      this.final = this.generales.combianrArrays(this.respuesta, respuesta);
      this.traerAlumno();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerAlumno() {
    this.cargando = true;
    this.reportes.alumnos(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.porcentaje = 50;
      this.final = this.generales.combianrArrays(this.final, respuesta);
      this.traerEscolres();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerEscolres() {
    this.cargando = true;
    this.reportes.escolares(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.final = this.generales.combianrArrays(this.final, respuesta);
      this.porcentaje = 67;
      this.traerPublicitarios();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerPublicitarios() {
    this.cargando = true;
    this.reportes.publicitarios(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.porcentaje = 84;
      this.final = this.generales.combianrArrays(this.final, respuesta);
      this.traerCuenta();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerCuenta() {
    this.cargando = true;
    this.reportes.cuenta(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.porcentaje = 100;
      this.final = this.generales.combianrArrays(this.final, respuesta);
      this.excel();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  excel() {
    this.datos = this.final;
    exportCSVFile(this.headers, this.datos, 'estadisticasMaestras');
  }
}
