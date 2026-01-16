export interface Pregunta {
  indice: number;
  pregunta: string;
  respuestaA: string;
  respuestaB: string;
  respuestaC: string;
  respuestaD: string;
  correcta: 'A' | 'B' | 'C' | 'D';
  explicacion?: string;
  idLectura?: number
}