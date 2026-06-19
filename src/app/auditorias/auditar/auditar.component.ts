import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { AuditoriasService } from '../../servicios/auditorias.service';
import * as Papa from 'papaparse';
import { IngresosService } from '../../servicios/ingresos.service';
import { CuentasService } from '../../servicios/cuentas.service';
import { CSVBancosService } from '../../servicios/csvbancos.service';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrl: './auditar.component.css'
})
export class AuditarComponent {
  cargando = false;
  lista_bancos = new Array();
  transacciones: any;
  lista_ingresos: any;
  busqueda_posibles = {
    idCuenta: 0,
    mes: '',
    anio: ''
  }
  archivoCSV!: File;
  transaccionesIngresos: any;
  constructor(private generales: GeneralesService,
              private bancos: CuentasService,
              private auditorias: AuditoriasService,
              private csvBancos: CSVBancosService
            ){}

  ngOnInit(){
    this.traerBancos();
  }

  traerBancos(){
    this.cargando = true;
    this.bancos.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.lista_bancos = respuesta;
      this.cargando = false;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.archivoCSV = file;
  }

  async posibles(){
    const resultado =
    await this.csvBancos.leer(
      this.busqueda_posibles.idCuenta,
      this.archivoCSV
    );
    this.transacciones = resultado.transacciones;

    this.busqueda_posibles.mes = resultado.mes.toString();
    this.busqueda_posibles.anio = resultado.anio.toString();
    this.cargando = true;
    this.auditorias.posiblesIngresos(this.busqueda_posibles).subscribe((respuesta: any) => {
      this.cargando = false;
      this.lista_ingresos = respuesta;
      this.empatar();
      this.cargando = false;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  async empatar() {

    if (!this.transacciones || !this.lista_ingresos) {
      return this.generales.mensajeError(
        'Asegúrate de haber subido el CSV y cargado los ingresos'
      );
    }
  
    this.cargando = true;
  
    let totalEncontrados = 0;
  
    this.transaccionesIngresos = this.transacciones.filter(
      (t: any) => t.tipo === 'INGRESO'
    );
  
    this.transaccionesIngresos.forEach((trans: any) => {
  
      const coincidencias = this.lista_ingresos
        .map((ing: any) => {
  
          let porcentaje = 0;
  
          // Monto
          if (Number(trans.monto) === Number(ing.monto)) {
            porcentaje += 30;
          }
  
          // Concepto (nombre del alumno)
          const conceptoBanco = this.normalizarTexto(
            trans.concepto
          );
  
          const conceptoIngreso = this.normalizarTexto(
            ing.concepto
          );
  
          if (
            conceptoBanco.includes(conceptoIngreso) ||
            conceptoIngreso.includes(conceptoBanco)
          ) {
            porcentaje += 20;
          }
  
          // Fecha
          if (
            String(trans.fecha || '') ===
            String(ing.fecha || '')
          ) {
            porcentaje += 20;
          }
  
          // Referencia
          if (
            trans.numeroReferencia &&
            ing.numeroReferencia &&
            String(trans.numeroReferencia).trim() ===
            String(ing.numeroReferencia).trim()
          ) {
            porcentaje += 30;
          }
  
          return {
            ...ing,
            porcentaje
          };
  
        })
        .filter((x: any) => x.porcentaje >= 40)
        .sort((a: any, b: any) => b.porcentaje - a.porcentaje);
  
      trans.coincidencias = coincidencias;
  
      if (coincidencias.length > 0) {
        totalEncontrados++;
      }
  
    });
  
    this.cargando = false;
  
    this.generales.mensajeCorrecto(
      `Proceso finalizado: Se encontraron coincidencias para ${totalEncontrados} de ${this.transaccionesIngresos.length} transacciones.`
    );
  
  }

  private normalizarTexto(texto: string): string {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();
  }

  confirmar(body: any) {

    this.cargando = true;
  
    this.auditorias.auditarIngreso(body).subscribe(
      (respuesta: any) => {
  
        this.cargando = false;
  
        this.generales.mensajeCorrecto(
          'Ingreso auditado de manera correcta'
        );
  
        // Eliminar el ingreso confirmado de TODAS las demás filas
  
        this.transaccionesIngresos.forEach((trans: any) => {
  
          if (trans.numeroFila !== body.dato.numeroFila) {
  
            trans.coincidencias =
              trans.coincidencias?.filter(
                (c: any) => c.id !== body.id
              ) || [];
  
          }
  
        });
  
        // Marcar la fila actual como auditada
  
        body.dato.auditado = true;
  
        // Guardar únicamente el folio para mostrarlo arriba
  
        body.dato.folioConfirmado = body.ingreso.folio;
  
        // Ya no tiene sentido conservar coincidencias
  
        body.dato.coincidencias = [];
  
      },
      error => {
  
        this.cargando = false;
        this.generales.interpretarError(error);
  
      }
    );
  
  }

}
