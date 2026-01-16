import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pregunta-quiz',
  templateUrl: './pregunta-quiz.component.html',
  styleUrl: './pregunta-quiz.component.css'
})
export class PreguntaQuizComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() valor: any;
  @Input() numero: any;
  @Input() texto = '';
  constructor() { }

  ngOnInit(): void {
  }

  emitir() {
    this.emitidor.emit(this.valor);
  }
}
