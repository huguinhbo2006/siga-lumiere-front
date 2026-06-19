import { Injectable } from '@angular/core';
import { ResultadoLecturaCSV } from '../interfaces/resultado-lectura-csv';
import * as Papa from 'papaparse';
import { TransaccionBanco } from '../interfaces/transaccion-banco';


@Injectable({
  providedIn: 'root'
})
export class CSVBancosService {

  constructor() { }

  leer(idBanco: number, archivo: File): Promise<ResultadoLecturaCSV> {
    switch (idBanco.toString()) {

      case '1':
        return this.leerSantander(archivo);

      default:
        return Promise.reject('Banco no soportado');
    }
  }

  private leerSantander(file: File): Promise<ResultadoLecturaCSV> {

    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        encoding: 'ISO-8859-1',
        complete: (result: any) => {
          const transacciones: TransaccionBanco[] = [];
          let inicio = 1;
          result.data.forEach((row: any) => {
            const fechaRaw = String(row.Fecha || '')
              .replace(/'/g, '')
              .trim();
            if (fechaRaw.length !== 8) {
              return;
            }
            const dia = fechaRaw.substring(0, 2);
            const mes = fechaRaw.substring(2, 4);
            const anio = fechaRaw.substring(4, 8);
            transacciones.push({
              numeroFila: inicio+1,
              fecha: `${anio}-${mes}-${dia}`,
              concepto: String(row.Concepto || '').trim(),
              monto: Number(row.Importe || 0),
              tipo: row['Cargo/Abono'] === '+'
                ? 'INGRESO'
                : 'EGRESO',
              numeroReferencia: String(
                row.Referencia || ''
              ).trim(),
              claveRastreo: String(
                row['Clave de Rastreo'] || ''
              ).trim(),
              descripcion: String(
                row.Descripcion || ''
              ).trim(),
              datosOriginales: row
            });
            inicio++;
          });
          if (!transacciones.length) {
            return reject('No se encontraron movimientos');
          }
          resolve({
            mes: parseInt(
              transacciones[0].fecha.substring(5, 7)
            ),
            anio: parseInt(
              transacciones[0].fecha.substring(0, 4)
            ),
            transacciones
          });
        },
        error: reject
      });
    });
  }

}