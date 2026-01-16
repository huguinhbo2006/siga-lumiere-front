import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.component.html',
  styleUrl: './modal-quiz.component.css'
})
export class ModalQuizComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idSubtema: 0,
    imagen: '',
    paga: false
  };
  @Input() idSubtema = 0;
  @Input() nombreSubtema = '';
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.dato.idSubtema = this.idSubtema;
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
