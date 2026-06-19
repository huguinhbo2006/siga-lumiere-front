import { TransaccionBanco } from './transaccion-banco';

export interface ResultadoLecturaCSV {
  mes: number;
  anio: number;
  transacciones: TransaccionBanco[];
}