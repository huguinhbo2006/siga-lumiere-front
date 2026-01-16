import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Pregunta } from '../../interfaces/pregunta.interface';

@Component({
  selector: 'app-preguntas-quiz',
  templateUrl: './preguntas-quiz.component.html',
  styleUrl: './preguntas-quiz.component.css'
})
export class PreguntasQuizComponent {
  @Input() preguntas: Pregunta[] = [];
  @Input() listaLecturas: any;
  @Input() modificar = true;
  @Output() emitidor = new EventEmitter<any>();
  @Output() emitidorModificar = new EventEmitter<any>();
  @Output() memoria = new EventEmitter<any>();
  preguntaSeleccionada!: Pregunta;
  ver = '';
  carga = '';

  constructor(private generales: GeneralesService) { }

  ngOnInit(): void {
    this.preguntaSeleccionada = this.preguntas[0];
  }

  validarPregunta(p: Pregunta): boolean {
    // Revisamos que los campos obligatorios no estén vacíos o nulos
    if (!p.indice && p.indice !== 0) return false;
    if (!p.pregunta || p.pregunta.trim() === '') return false;
    if (!p.respuestaA || p.respuestaA.trim() === '') return false;
    if (!p.respuestaB || p.respuestaB.trim() === '') return false;
    if (!p.respuestaC || p.respuestaC.trim() === '') return false;
    if (!p.respuestaD || p.respuestaD.trim() === '') return false;
    if (!p.correcta || p.correcta.trim() === '') return false;
  
    // Todas las validaciones pasaron
    return true;
  }

  seleccionarPregunta(indice: any) {
    this.preguntaSeleccionada = this.preguntas[indice];
  }

  emitir() {
    this.emitidor.emit(this.preguntas);
  }

  emitirModificar() {
    this.emitidorModificar.emit(this.preguntas);
  }

  emitirMemoria(){
    this.memoria.emit(this.preguntas);
  }

  llenarPregunta(texto: any){
    let contenido = texto.replace(/\n/g, ' ');
    contenido = contenido.split('(');

    this.preguntaSeleccionada.pregunta = contenido[0].split(')')[1];
    
    let respuestaA = contenido[1].split(')');
    if(respuestaA[1].trim().endsWith('<>')){
      this.preguntaSeleccionada.correcta = 'A';
      this.preguntaSeleccionada.respuestaA = respuestaA[1].replace('<>', "").trim();
    }else{
      this.preguntaSeleccionada.respuestaA = respuestaA[1].trim();
    }
    
    let respuestaB = contenido[2].split(')');
    if(respuestaB[1].trim().endsWith('<>')){
      this.preguntaSeleccionada.correcta = 'B';
      this.preguntaSeleccionada.respuestaB = respuestaB[1].replace('<>', "").trim();
    }else{
      this.preguntaSeleccionada.respuestaB = respuestaB[1].trim();
    }
    
    let respuestaC = contenido[3].split(')');
    if(respuestaC[1].trim().endsWith('<>')){
      this.preguntaSeleccionada.correcta = 'C';
      this.preguntaSeleccionada.respuestaC = respuestaC[1].replace('<>', "").trim();
    }else{
      this.preguntaSeleccionada.respuestaC = respuestaC[1].trim();
    }
    
    let respuestaD = contenido[4].split(')');
    if(respuestaD[1].trim().endsWith('<>')){
      this.preguntaSeleccionada.correcta = 'D';
      this.preguntaSeleccionada.respuestaD = respuestaD[1].replace('<>', "").trim();
    }else{
      this.preguntaSeleccionada.respuestaD = respuestaD[1].trim();
    }
    
  }

}
