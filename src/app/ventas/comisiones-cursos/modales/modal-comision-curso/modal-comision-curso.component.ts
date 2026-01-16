import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-comision-curso',
  templateUrl: './modal-comision-curso.component.html',
  styleUrl: './modal-comision-curso.component.css'
})
export class ModalComisionCursoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    idCalendario: 0,
    idCurso: 0,
    tipo: 0,
    comision: ''
  };
  @Input() modificar = false;
  @Input() listas = {
    calendarios: [],
    cursos: []
  }
  tipos = [
    { id: 1, nombre: '%' },
    { id: 2, nombre: '$' }
  ]
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
