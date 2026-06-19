export interface TransaccionBanco {
  numeroFila?: number,

  fecha: string;

  concepto?: string;

  monto: number;

  claveRastreo?: string;

  numeroReferencia?: string;

  tipo: 'INGRESO' | 'EGRESO';

  descripcion?: string;

  datosOriginales?: any;

}